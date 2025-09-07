// Domain types - cleaned and normalized for the app
export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  adults: number; // Derived from form type
  engine: string;
  transmission: string;
  
  // Vehicle details
  details: {
    form: string;
    length: string;
    width: string;
    height: string;
    tank: string;
    consumption: string;
  };
  
  // Gallery images
  gallery: string[];
  
  // Reviews
  reviews: Review[];
  
  // Feature flags (normalized to numbers for consistency)
  features: {
    airConditioner: number;
    bathroom: number;
    kitchen: number;
    beds: number;
    TV: number;
    CD: number;
    radio: number;
    shower: number;
    toilet: number;
    freezer: number;
    hob: number;
    microwave: number;
    gas: number;
    water: number;
  };
}

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Filters {
  location?: string;
  type?: 'van' | 'fully-integrated' | 'alcove' | 'panelTruck';
  features: string[];
}

export interface BookingPayload {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
}

export interface PaginationState {
  page: number;
  limit: number;
  hasMore: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export type CamperType = 'van' | 'fully-integrated' | 'alcove' | 'panelTruck';

export type FeatureKey = 
  | 'airConditioner'
  | 'bathroom'
  | 'kitchen'
  | 'beds'
  | 'TV'
  | 'CD'
  | 'radio'
  | 'shower'
  | 'toilet'
  | 'freezer'
  | 'hob'
  | 'microwave'
  | 'gas'
  | 'water';
