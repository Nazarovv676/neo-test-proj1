import type { CamperApi } from '@/shared/types/camper.api';
import { describe, expect, it } from 'vitest';
import sampleData from '../__fixtures__/sample-data.json';
import { parseCamper, parseCampers } from '../parseCamper';

describe('parseCamper', () => {
  it('should parse API data to domain model correctly', () => {
    const apiCamper = sampleData.items[0];
    const domainCamper = parseCamper(apiCamper);

    // Basic fields
    expect(domainCamper.id).toBe('1');
    expect(domainCamper.name).toBe('Road Bear C 23-25');
    expect(domainCamper.price).toBe(10000);
    expect(domainCamper.rating).toBe(4.5);
    expect(domainCamper.location).toBe('Ukraine, Kyiv');

    // Features should be normalized to numbers
    expect(domainCamper.features.airConditioner).toBe(1);
    expect(domainCamper.features.bathroom).toBe(1);
    expect(domainCamper.features.kitchen).toBe(0);
    expect(domainCamper.features.TV).toBe(1);
    expect(domainCamper.features.radio).toBe(1);
    expect(domainCamper.features.microwave).toBe(1);
    expect(domainCamper.features.gas).toBe(0);
    expect(domainCamper.features.water).toBe(1);

    // Gallery should be parsed correctly
    expect(domainCamper.gallery).toHaveLength(2);
    expect(domainCamper.gallery[0]).toBe('https://ftp.goit.study/img/campers-test-task/1-1.webp');

    // Reviews should be parsed correctly
    expect(domainCamper.reviews).toHaveLength(2);
    expect(domainCamper.reviews[0].reviewer_name).toBe('Alice');
    expect(domainCamper.reviews[0].reviewer_rating).toBe(5);

    // Details should be preserved
    expect(domainCamper.details.form).toBe('alcove');
    expect(domainCamper.details.length).toBe('7.3m');
    expect(domainCamper.engine).toBe('diesel');
    expect(domainCamper.transmission).toBe('automatic');
  });

  it('should handle missing fields with safe defaults', () => {
    const incompleteApiCamper = {
      id: '2',
      name: 'Test Camper',
      price: 5000,
    };

    const domainCamper = parseCamper(incompleteApiCamper as CamperApi);

    expect(domainCamper.id).toBe('2');
    expect(domainCamper.name).toBe('Test Camper');
    expect(domainCamper.price).toBe(5000);
    expect(domainCamper.rating).toBe(0);
    expect(domainCamper.location).toBe('');
    expect(domainCamper.description).toBe('');
    expect(domainCamper.gallery).toEqual([]);
    expect(domainCamper.reviews).toEqual([]);
    expect(domainCamper.features.airConditioner).toBe(0);
  });

  it('should calculate average rating from reviews when rating is missing', () => {
    const apiCamper = {
      id: '3',
      name: 'Test Camper',
      price: 5000,
      reviews: [
        { reviewer_name: 'Alice', reviewer_rating: 5, comment: 'Great!' },
        { reviewer_name: 'Bob', reviewer_rating: 3, comment: 'OK' },
      ],
    };

    const domainCamper = parseCamper(apiCamper as CamperApi);
    expect(domainCamper.rating).toBe(4); // (5 + 3) / 2 = 4
  });

  it('should parse multiple campers correctly', () => {
    const domainCampers = parseCampers(sampleData.items);
    expect(domainCampers).toHaveLength(1);
    expect(domainCampers[0].id).toBe('1');
  });
});
