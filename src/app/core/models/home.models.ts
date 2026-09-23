export interface ApiResponse<T> {
  status: string;
  message?: string;
  data: T;
}

export interface HomeStatsDto {
  id: string;
  num: number;
  label: string;
  sub: string;
  displayOrder: number;
}

export interface CourseCardDto {
  id: string;
  title: string;
  description?: string;
  price: number;
  image?: string;
  duration?: string;
  displayOrder: number;
}

export interface TestimonialDto {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  image?: string;
  course?: string;
  displayOrder: number;
}

export interface TrainedConsultantDto {
  id: string;
  name: string;
  specializations: string[];
  location: string;
  image?: string;
  bio?: string;
  rating: number;
  contactEmail?: string;
  contactPhone?: string;
  isVerified: boolean;
  displayOrder: number;
}

export interface DashboardDto {
  hero?: {
    title: string;
    subtitle: string;
    image?: string;
  };
  stats: HomeStatsDto[];
  featuredCourses: CourseCardDto[];
  testimonials: TestimonialDto[];
  trainedConsultants: TrainedConsultantDto[];
}

export interface CreateHomeStatsDto {
  num: number;
  label: string;
  sub: string;
  displayOrder: number;
}

export interface UpdateHomeStatsDto {
  num?: number;
  label?: string;
  sub?: string;
  displayOrder?: number;
}

export interface CreateTestimonialDto {
  name: string;
  location: string;
  quote: string;
  rating: number;
  image?: string;
  course?: string;
  displayOrder: number;
}

export interface UpdateTestimonialDto {
  name?: string;
  location?: string;
  quote?: string;
  rating?: number;
  image?: string;
  course?: string;
  displayOrder?: number;
}

export interface CreateTrainedConsultantDto {
  name: string;
  specializations: string[];
  location: string;
  image?: string;
  bio?: string;
  rating: number;
  contactEmail?: string;
  contactPhone?: string;
  isVerified?: boolean;
  displayOrder: number;
}

export interface UpdateTrainedConsultantDto {
  name?: string;
  specializations?: string[];
  location?: string;
  image?: string;
  bio?: string;
  rating?: number;
  contactEmail?: string;
  contactPhone?: string;
  isVerified?: boolean;
  displayOrder?: number;
}
