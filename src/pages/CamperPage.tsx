import { clearCamper } from '@/features/camper/camper.slice';
import { fetchCamperById } from '@/features/camper/camper.thunks';
import {
  BookingForm,
  CamperDetailsTable,
  CamperFeatures,
  CamperGallery,
  Reviews,
} from '@/features/camper/components';
import { Badge, Loader, Rating } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import {
  calcAverageRating,
  formatPrice,
  getAvailableFeatures,
} from '@/shared/lib';
import type { BookingPayload } from '@/shared/types';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CamperPage.module.css';

export const CamperPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    current: camper,
    status,
    error,
  } = useAppSelector((state) => state.camper);
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>(
    'features'
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCamperById(id));
    }

    return () => {
      dispatch(clearCamper());
    };
  }, [dispatch, id]);

  const handleBookingSubmit = (data: BookingPayload) => {
    console.log('Booking submitted:', data);
    // In a real app, this would send the booking to the backend
  };

  if (status === 'loading') {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.loading}>
            <Loader size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (status === 'failed' || !camper) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.error}>
            <h2>Camper not found</h2>
            <p>{error || 'The camper you are looking for does not exist.'}</p>
            <button
              onClick={() => navigate('/catalog')}
              className={styles.backButton}
            >
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  const averageRating = calcAverageRating(camper.reviews);
  const features = getAvailableFeatures(camper);

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.mainContent}>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.titleSection}>
                <h1 className={styles.title}>{camper.name}</h1>
                <div className={styles.rating}>
                  <Rating
                    rating={averageRating}
                    showNumber
                    showCount
                    reviewCount={camper.reviews.length}
                    size="md"
                  />
                </div>
                <div className={styles.location}>📍 {camper.location}</div>
              </div>
              <div className={styles.priceSection}>
                <div className={styles.price}>
                  {formatPrice(camper.price)}
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className={styles.gallery}>
              <CamperGallery images={camper.gallery} name={camper.name} />
            </div>

            {/* Features */}
            <div className={styles.features}>
              <div className={styles.featureBadges}>
                {features.slice(0, 6).map((feature) => (
                  <Badge key={feature} variant="primary" size="md">
                    {feature}
                  </Badge>
                ))}
                {features.length > 6 && (
                  <Badge variant="secondary" size="md">
                    +{features.length - 6} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
              <div className={styles.tabHeader}>
                <button
                  className={`${styles.tab} ${activeTab === 'features' ? styles.active : ''}`}
                  onClick={() => setActiveTab('features')}
                >
                  Features
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </div>

              <div className={styles.tabContent}>
                {activeTab === 'features' && (
                  <div className={styles.tabPanel}>
                    <CamperFeatures camper={camper} />
                    <CamperDetailsTable camper={camper} />
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className={styles.tabPanel}>
                    <Reviews
                      reviews={camper.reviews}
                      averageRating={averageRating}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <BookingForm
              camperName={camper.name}
              onSubmit={handleBookingSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
