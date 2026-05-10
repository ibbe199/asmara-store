export interface Ad {
  id: number;
  user_id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  location: string;
  is_featured: boolean;
  created_at: string;
  // Category specific fields
  car_model?: string;
  car_year?: number;
  car_mileage?: number;
  property_rooms?: number;
  property_area?: number;
  property_furnished?: boolean;
  job_type?: string;
  salary_range?: string;
  condition?: 'new' | 'used';
  brand?: string;
}

export interface Profile {
  id: string;
  full_name: string;
  phone_number?: string;
  city?: string;
  avatar_url?: string;
  updated_at: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}
