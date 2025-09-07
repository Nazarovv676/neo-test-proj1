import { z } from 'zod';

// Gallery item schema
export const GalleryItemSchema = z.object({
  thumb: z.string().url(),
  original: z.string().url(),
});

// Review schema
export const ReviewApiSchema = z.object({
  reviewer_name: z.string(),
  reviewer_rating: z.coerce.number().min(1).max(5),
  comment: z.string(),
});

// Main camper API schema based on live data
export const CamperApiSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.coerce.number().min(0),
  rating: z.coerce.number().min(0).max(5).optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  
  // Vehicle details
  form: z.string().optional(),
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  tank: z.string().optional(),
  consumption: z.string().optional(),
  transmission: z.string().optional(),
  engine: z.string().optional(),
  
  // Feature flags (booleans)
  AC: z.boolean().optional(),
  bathroom: z.boolean().optional(),
  kitchen: z.boolean().optional(),
  TV: z.boolean().optional(),
  radio: z.boolean().optional(),
  refrigerator: z.boolean().optional(),
  microwave: z.boolean().optional(),
  gas: z.boolean().optional(),
  water: z.boolean().optional(),
  
  // Gallery and reviews
  gallery: z.array(GalleryItemSchema).optional(),
  reviews: z.array(ReviewApiSchema).optional(),
});

// API response schemas
export const CampersListApiSchema = z.object({
  total: z.number(),
  items: z.array(CamperApiSchema),
});

// Infer TypeScript types from Zod schemas
export type CamperApi = z.infer<typeof CamperApiSchema>;
export type ReviewApi = z.infer<typeof ReviewApiSchema>;
export type GalleryItemApi = z.infer<typeof GalleryItemSchema>;
export type CampersListApi = z.infer<typeof CampersListApiSchema>;
