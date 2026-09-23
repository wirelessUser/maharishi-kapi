import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminContentService {
  private readonly http = inject(HttpClient);
private readonly baseUrl = 'https://localhost:7263/api/v1/home';
  readonly isProcessing = signal(false);

  // --- ROLES ---
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/roles`);
  }
  createRole(payload: any): Observable<any> {
    this.isProcessing.set(true);
    return this.http.post(`${this.baseUrl}/roles`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  updateRole(id: string, payload: any): Observable<void> {
    this.isProcessing.set(true);
    return this.http.put<void>(`${this.baseUrl}/roles/${id}`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  deleteRole(id: string): Observable<void> {
    this.isProcessing.set(true);
    return this.http.delete<void>(`${this.baseUrl}/roles/${id}`).pipe(finalize(() => this.isProcessing.set(false)));
  }

  // --- JOURNEY PATHS ---
  getJourneyPaths(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/journey`);
  }
  createJourneyPath(payload: any): Observable<any> {
    this.isProcessing.set(true);
    return this.http.post(`${this.baseUrl}/journey`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  updateJourneyPath(id: string, payload: any): Observable<void> {
    this.isProcessing.set(true);
    return this.http.put<void>(`${this.baseUrl}/journey/${id}`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  deleteJourneyPath(id: string): Observable<void> {
    this.isProcessing.set(true);
    return this.http.delete<void>(`${this.baseUrl}/journey/${id}`).pipe(finalize(() => this.isProcessing.set(false)));
  }

  // --- IMMERSIVE APP SCREENS ---
  getAppScreens(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/immersive`);
  }
  createAppScreen(payload: any): Observable<any> {
    this.isProcessing.set(true);
    return this.http.post(`${this.baseUrl}/immersive`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  updateAppScreen(id: string, payload: any): Observable<void> {
    this.isProcessing.set(true);
    return this.http.put<void>(`${this.baseUrl}/immersive/${id}`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  deleteAppScreen(id: string): Observable<void> {
    this.isProcessing.set(true);
    return this.http.delete<void>(`${this.baseUrl}/immersive/${id}`).pipe(finalize(() => this.isProcessing.set(false)));
  }

  // --- CONSULTATIONS ---
  getConsultations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/consultations`);
  }
  createConsultation(payload: any): Observable<any> {
    this.isProcessing.set(true);
    return this.http.post(`${this.baseUrl}/consultations`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  updateConsultation(id: string, payload: any): Observable<void> {
    this.isProcessing.set(true);
    return this.http.put<void>(`${this.baseUrl}/consultations/${id}`, payload).pipe(finalize(() => this.isProcessing.set(false)));
  }
  deleteConsultation(id: string): Observable<void> {
    this.isProcessing.set(true);
    return this.http.delete<void>(`${this.baseUrl}/consultations/${id}`).pipe(finalize(() => this.isProcessing.set(false)));
  }

 

// Retreats CRUD
getRetreats(): Observable<any[]> {
  return this.http.get<any[]>('https://localhost:7263/api/v1/retreats');
}

getRetreatBySlug(slug: string): Observable<any> {
  return this.http.get<any>(`https://localhost:7263/api/v1/retreats/${slug}`);
}

createRetreat(payload: any): Observable<any> {
  return this.http.post('https://localhost:7263/api/v1/retreats', payload);
}

updateRetreat(id: string, payload: any): Observable<any> {
  return this.http.put(`https://localhost:7263/api/v1/retreats/${id}`, payload);
}

deleteRetreat(id: string): Observable<any> {
  return this.http.delete(`https://localhost:7263/api/v1/retreats/${id}`);
}

// 1-Click Direct Azure Upload
uploadImage(file: File, folder = 'retreats'): Observable<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post<{ url: string }>(`https://localhost:7263/api/v1/media/upload?folder=${folder}`, formData);
}
}