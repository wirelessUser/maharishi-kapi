import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ApiResponse,
  DashboardDto,
  CourseCardDto,
  TestimonialDto,
  TrainedConsultantDto,
  HomeStatsDto,
  CreateHomeStatsDto,
  UpdateHomeStatsDto,
  CreateTestimonialDto,
  UpdateTestimonialDto,
  CreateTrainedConsultantDto,
  UpdateTrainedConsultantDto
} from '../models/home.models';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = `${environment.apiUrl}/home`;

  constructor(private http: HttpClient) {}

  // Queries
  getDashboard(): Observable<ApiResponse<DashboardDto>> {
    return this.http.get<ApiResponse<DashboardDto>>(`${this.apiUrl}/dashboard`);
  }

  getFeaturedCourses(limit: number = 6): Observable<ApiResponse<CourseCardDto[]>> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<ApiResponse<CourseCardDto[]>>(
      `${this.apiUrl}/featured-courses`,
      { params }
    );
  }

  getTestimonials(
    limit: number = 10,
    sort: 'recent' | 'rating' = 'recent'
  ): Observable<ApiResponse<TestimonialDto[]>> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('sort', sort);
    return this.http.get<ApiResponse<TestimonialDto[]>>(
      `${this.apiUrl}/testimonials`,
      { params }
    );
  }

  getTrainedConsultants(
    limit: number = 12,
    specialization?: string,
    location?: string
  ): Observable<ApiResponse<TrainedConsultantDto[]>> {
    let params = new HttpParams().set('limit', limit.toString());
    if (specialization) {
      params = params.set('specialization', specialization);
    }
    if (location) {
      params = params.set('location', location);
    }
    return this.http.get<ApiResponse<TrainedConsultantDto[]>>(
      `${this.apiUrl}/trained-consultants`,
      { params }
    );
  }

  getStats(): Observable<ApiResponse<HomeStatsDto[]>> {
    return this.http.get<ApiResponse<HomeStatsDto[]>>(`${this.apiUrl}/stats`);
  }

  // Stats Mutations
  createStats(dto: CreateHomeStatsDto): Observable<ApiResponse<HomeStatsDto>> {
    return this.http.post<ApiResponse<HomeStatsDto>>(
      `${this.apiUrl}/stats`,
      dto
    );
  }

  updateStats(
    id: string,
    dto: UpdateHomeStatsDto
  ): Observable<ApiResponse<HomeStatsDto>> {
    return this.http.put<ApiResponse<HomeStatsDto>>(
      `${this.apiUrl}/stats/${id}`,
      dto
    );
  }

  deleteStats(id: string): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/stats/${id}`);
  }

  // Testimonials Mutations
  createTestimonial(
    dto: CreateTestimonialDto
  ): Observable<ApiResponse<TestimonialDto>> {
    return this.http.post<ApiResponse<TestimonialDto>>(
      `${this.apiUrl}/testimonials`,
      dto
    );
  }

  updateTestimonial(
    id: string,
    dto: UpdateTestimonialDto
  ): Observable<ApiResponse<TestimonialDto>> {
    return this.http.put<ApiResponse<TestimonialDto>>(
      `${this.apiUrl}/testimonials/${id}`,
      dto
    );
  }

  deleteTestimonial(id: string): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `${this.apiUrl}/testimonials/${id}`
    );
  }

  // Trained Consultants Mutations
  createTrainedConsultant(
    dto: CreateTrainedConsultantDto
  ): Observable<ApiResponse<TrainedConsultantDto>> {
    return this.http.post<ApiResponse<TrainedConsultantDto>>(
      `${this.apiUrl}/trained-consultants`,
      dto
    );
  }

  updateTrainedConsultant(
    id: string,
    dto: UpdateTrainedConsultantDto
  ): Observable<ApiResponse<TrainedConsultantDto>> {
    return this.http.put<ApiResponse<TrainedConsultantDto>>(
      `${this.apiUrl}/trained-consultants/${id}`,
      dto
    );
  }

  deleteTrainedConsultant(id: string): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `${this.apiUrl}/trained-consultants/${id}`
    );
  }
}
