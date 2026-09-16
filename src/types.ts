export type GalleryCategory =
  | 'all'
  | 'editorial'
  | 'street-noir'
  | 'architecture'
  | 'raw-portraits';

export interface PhotoItem {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryLabel: string;
  image: string;
  secondaryImage?: string;
  aspectRatio: 'tall' | 'square' | 'wide' | 'panoramic';
  gridSpan?: string; // For messy asymmetrical editorial grid layout
  focalLength: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
  location: string;
  year: string;
  story: string;
  tags: string[];
  isVideo?: boolean;
}

export interface ProcedureStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  focusArea: string;
  keyDeliverables: string[];
  image: string;
}

export interface PhilosophyThought {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  category: string;
  excerpt: string;
  fullEssay: string[];
  coverImage: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  location: string;
  quote: string;
  rating: number;
  projectType: string;
  year: string;
  avatar: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  locationPreference: 'delhi-ncr' | 'destination' | 'studio' | 'outdoor-heritage';
  targetDate: string;
  visionNotes: string;
}

export interface PhotographerInfo {
  name: string;
  title: string;
  tagline: string;
  baseLocation: string;
  secondaryLocation: string;
  phone: string;
  email: string;
  instagram: string;
  behance: string;
  stats: {
    label: string;
    value: string;
  }[];
}
