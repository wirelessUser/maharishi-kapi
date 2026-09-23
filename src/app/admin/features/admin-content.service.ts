import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminContentService {
  private readonly http = inject(HttpClient);
  
  // मुख्य बेस URL (हमेशा HTTPS का उपयोग करें)
  private readonly apiBaseUrl = 'https://maharishikapicomwebapi-e0edcjh9d3eufrak.centralindia-01.azurewebsites.net/api/v1';
  private readonly homeUrl = `${this.apiBaseUrl}/home`;

  readonly isProcessing = signal(false);

  // --- ROLES ---
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.homeUrl}/roles`);
  }
  createRole(payload: any): Observable<any> {
    this.isProcessing.set(true);
    return this.http.post(`${this.homeUrl}/roles`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  updateRole(id: string, payload: any): Observable<void> {
    this.isProcessing.set(true);
    return this.http.put<void>(`${this.homeUrl}/roles/${id}`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  deleteRole(id: string): Observable<void> {
    this.isProcessing.set(true);
    return this.http.delete<void>(`${this.homeUrl}/roles/${id}`).pipe(finalize(() => this.isProcessing.set(false)));
  }

  // --- JOURNEY PATHS ---
  getJourneyPaths(): Observable<any[]> {
    return this.http.get<any[]>(`${this.homeUrl}/journey`);
  }
  createJourneyPath(payload: any): Observable<any> {
    this.isProcessing.set(true);
    return this.http.post(`${this.homeUrl}/journey`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  updateJourneyPath(id: string, payload: any): Observable<void> {
    this.isProcessing.set(true);
    return this.http.put<void>(`${this.homeUrl}/journey/${id}`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  deleteJourneyPath(id: string): Observable<void> {
    this.isProcessing.set(true);
    return this.http.delete<void>(`${this.homeUrl}/journey/${id}`).pipe(finalize(() => this.isProcessing.set(false)));
  }

  // --- IMMERSIVE APP SCREENS ---
  getAppScreens(): Observable<any[]> {
    return this.http.get<any[]>(`${this.homeUrl}/immersive`);
  }
  createAppScreen(payload: any): Observable<any> {
    this.isProcessing.set(true);
    return this.http.post(`${this.homeUrl}/immersive`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  updateAppScreen(id: string, payload: any): Observable<void> {
    this.isProcessing.set(true);
    return this.http.put<void>(`${this.homeUrl}/immersive/${id}`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  deleteAppScreen(id: string): Observable<void> {
    this.isProcessing.set(true);
    return this.http.delete<void>(`${this.homeUrl}/immersive/${id}`).pipe(finalize(() => this.isProcessing.set(false)));
  }

  // --- CONSULTATIONS ---
  getConsultations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.homeUrl}/consultations`);
  }
  createConsultation(payload: any): Observable<any> {
    this.isProcessing.set(true);
    return this.http.post(`${this.homeUrl}/consultations`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  updateConsultation(id: string, payload: any): Observable<void> {
    this.isProcessing.set(true);
    return this.http.put<void>(`${this.homeUrl}/consultations/${id}`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  deleteConsultation(id: string): Observable<void> {
    this.isProcessing.set(true);
    return this.http.delete<void>(`${this.homeUrl}/consultations/${id}`).pipe(finalize(() => this.isProcessing.set(false)));
  }

  // --- RETREATS CRUD (HTTPS में अपडेटेड) ---
  getRetreats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/retreats`);
  }

  getRetreatBySlug(slug: string): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/retreats/${slug}`);
  }

  createRetreat(payload: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/retreats`, payload);
  }

  updateRetreat(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/retreats/${id}`, payload);
  }

  deleteRetreat(id: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/retreats/${id}`);
  }

  // --- 1-CLICK DIRECT AZURE UPLOAD (HTTPS में अपडेटेड) ---
  uploadImage(file: File, folder = 'retreats'): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.apiBaseUrl}/media/upload?folder=${folder}`, formData);
  }
}