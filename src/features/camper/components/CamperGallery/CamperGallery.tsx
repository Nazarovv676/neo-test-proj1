import React, { useState } from 'react';
import styles from './CamperGallery.module.css';

interface CamperGalleryProps {
  images: string[];
  name: string;
}

export const CamperGallery: React.FC<CamperGalleryProps> = ({
  images,
  name,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={styles.gallery}>
        <div className={styles.mainImage}>
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>🚐</span>
            <p className={styles.placeholderText}>No images available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <img
          src={images[selectedImage]}
          alt={`${name} - Image ${selectedImage + 1}`}
          className={styles.image}
        />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${
                selectedImage === index ? styles.selected : ''
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image}
                alt={`${name} - Thumbnail ${index + 1}`}
                className={styles.thumbnailImage}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
