import { Button, Input, Toast } from '@/shared/components';
import { getTodayString, isFutureDate } from '@/shared/lib';
import type { BookingPayload } from '@/shared/types';
import React, { useState } from 'react';
import styles from './BookingForm.module.css';

interface BookingFormProps {
  camperName: string;
  onSubmit: (data: BookingPayload) => void;
}

interface FormData {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  bookingDate?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.bookingDate) {
      newErrors.bookingDate = 'Booking date is required';
    } else if (!isFutureDate(formData.bookingDate)) {
      newErrors.bookingDate = 'Booking date must be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmit(formData);
      setShowToast(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        bookingDate: '',
        comment: '',
      });
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      // Clear error when user starts typing
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Book your campervan now</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Name*"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleInputChange('name')}
          error={errors.name}
          fullWidth
        />

        <Input
          label="Email*"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={errors.email}
          fullWidth
        />

        <Input
          label="Booking date*"
          type="date"
          min={getTodayString()}
          value={formData.bookingDate}
          onChange={handleInputChange('bookingDate')}
          error={errors.bookingDate}
          fullWidth
        />

        <div className={styles.textareaContainer}>
          <label htmlFor="comment" className={styles.label}>
            Comment
          </label>
          <textarea
            id="comment"
            placeholder="Enter your comment"
            value={formData.comment}
            onChange={handleInputChange('comment')}
            className={styles.textarea}
            rows={4}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          fullWidth
        >
          {isSubmitting ? 'Booking...' : 'Send'}
        </Button>
      </form>

      {showToast && (
        <Toast
          message="Booking successful! We will contact you soon."
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};
