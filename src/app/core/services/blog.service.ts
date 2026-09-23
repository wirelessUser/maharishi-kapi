import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/home.models';
import {
  ArticleDetailDto,
  ArticleDto,
  ArticleQuery,
  AuthorDto,
  CreateArticleDto,
  NewsletterSubscribeDto,
  PagedResponse,
  UpdateArticleDto
} from '../models/blog.models';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/blog`;

  // The API leaves the featured article out of this list; fetch it with getFeaturedArticle().
  getArticles(query: ArticleQuery = {}): Observable<PagedResponse<ArticleDto>> {
    let params = new HttpParams();
    if (query.page) {
      params = params.set('page', query.page);
    }
    if (query.pageSize) {
      params = params.set('pageSize', query.pageSize);
    }
    if (query.category) {
      params = params.set('category', query.category);
    }
    if (query.sortBy) {
      params = params.set('sortBy', query.sortBy);
    }
    return this.http.get<PagedResponse<ArticleDto>>(this.apiUrl, { params });
  }

  getFeaturedArticle(): Observable<ApiResponse<ArticleDto>> {
    return this.http.get<ApiResponse<ArticleDto>>(`${this.apiUrl}/featured/main`);
  }

  getTrendingArticles(count: number = 5): Observable<ApiResponse<ArticleDto[]>> {
    const params = new HttpParams().set('count', count);
    return this.http.get<ApiResponse<ArticleDto[]>>(`${this.apiUrl}/trending`, { params });
  }

  getCategories(): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${this.apiUrl}/categories`);
  }

  getAuthors(): Observable<ApiResponse<AuthorDto[]>> {
    return this.http.get<ApiResponse<AuthorDto[]>>(`${this.apiUrl}/authors`);
  }

  subscribe(email: string): Observable<ApiResponse<boolean>> {
    const body: NewsletterSubscribeDto = { email };
    return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/subscribe`, body);
  }

  // Detail endpoints also record a public view on the API side.
  getArticleById(id: string): Observable<ApiResponse<ArticleDetailDto>> {
    return this.http.get<ApiResponse<ArticleDetailDto>>(`${this.apiUrl}/${id}`);
  }

  createArticle(dto: CreateArticleDto): Observable<ApiResponse<ArticleDetailDto>> {
    return this.http.post<ApiResponse<ArticleDetailDto>>(this.apiUrl, dto);
  }

  updateArticle(id: string, dto: UpdateArticleDto): Observable<ApiResponse<ArticleDetailDto>> {
    return this.http.put<ApiResponse<ArticleDetailDto>>(`${this.apiUrl}/${id}`, dto);
  }

  deleteArticle(id: string): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
  }
}
