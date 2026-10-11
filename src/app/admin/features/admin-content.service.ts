import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, finalize } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminContentService {
  private readonly http = inject(HttpClient);

  // मुख्य बेस URL (HTTPS)
  private readonly apiBaseUrl = 'https://maharishikapicomwebapi-e0edcjh9d3eufrak.centralindia-01.azurewebsites.net/api/v1';
  private readonly homeUrl = `${this.apiBaseUrl}/home`;

  // UI Processing State
  readonly isProcessing = signal<boolean>(false);

  // =========================================================================
  // 🌟 IN-MEMORY CACHE SIGNALS (Data stays alive when navigating across pages)
  // =========================================================================
  readonly roles = signal<any[]>([]);
  readonly journeyPaths = signal<any[]>([]);
  readonly appScreens = signal<any[]>([]);
  readonly consultations = signal<any[]>([]);
  readonly retreats = signal<any[]>([]);

  // =========================================================================
  // 1. ROLES
  // =========================================================================
  getRoles(forceReload = false): Observable<any[]> {
    // If data already exists in memory and no force reload is requested, return cached data
    if (!forceReload && this.roles().length > 0) {
      return of(this.roles());
    }

    return this.http.get<any[]>(`${this.homeUrl}/roles`).pipe(
      tap((data) => this.roles.set(data || []))
    );
  }

  createRole(payload: any): Observable<any> {
    this.isProcessing.set(true);
    return this.http.post<any>(`${this.homeUrl}/roles`, payload).pipe(
      tap((newRole) => {
        // Automatically append to existing cached signal
        this.roles.update((list) => [...list, newRole || payload]);
      }),
      finalize(() => this.isProcessing.set(false))
    );
  }

  updateRole(id: string, payload: any): Observable<void> {
    this.isProcessing.set(true);
    return this.http.put<void>(`${this.homeUrl}/roles/${id}`, payload).pipe(
      tap(() => {
        // Update in-place in cached signal
        this.roles.update((list) =>
          list.map((item) => ((item.id ?? item._id ?? item.key) === id ? { ...item, ...payload } : item))
        );
      }),
      finalize(() => this.isProcessing.set(false))
    );
  }

  deleteRole(id: string): Observable<void> {
    this.isProcessing.set(true);
    return this.http.delete<void>(`${this.homeUrl}/roles/${id}`).pipe(
      tap(() => {
        // Remove from cached signal
        this.roles.update((list) =>
          list.filter((item) => (item.id ?? item._id ?? item.key) !== id)
        );
      }),
      finalize(() => this.isProcessing.set(false))
    );
  }

  // =========================================================================
  // 2. JOURNEY PATHS
  // =========================================================================
  getJourneyPaths(forceReload = false): Observable<any[]> {
    if (!forceReload && this.journeyPaths().length > 0) {
      return of(this.journeyPaths());
    }

    return this.http.get<any[]>(`${this.homeUrl}/journey`).pipe(
      tap((data) => this.journeyPaths.set(data || []))
    );
  }

  createJourneyPath(payload: any): Observable<any> {
    this.isProcessing.set(true);
    return this.http.post<any>(`${this.homeUrl}/journey`, payload).pipe(
      tap((newPath) => {
        this.journeyPaths.update((list) => [...list, newPath || payload]);
      }),
      finalize(() => this.isProcessing.set(false))
    );
  }

  updateJourneyPath(id: string, payload: any): Observable<void> {
    this.isProcessing.set(true);
    return this.http.put<void>(`${this.homeUrl}/journey/${id}`, payload).pipe(
      tap(() => {
        this.journeyPaths.update((list) =>
          list.map((item) => ((item.id ?? item._id ?? item.key) === id ? { ...item, ...payload } : item))
        );
      }),
      finalize(() => this.isProcessing.set(false))
    );
  }

  deleteJourneyPath(id: string): Observable<void> {
    this.isProcessing.set(true);
    return this.http.delete<void>(`${this.homeUrl}/journey/${id}`).pipe(
      tap(() => {
        this.journeyPaths.update((list) =>
          list.filter((item) => (item.id ?? item._id ?? item.key) !== id)
        );
      }),
      finalize(() => this.isProcessing.set(false))
    );
  }

  // =========================================================================
  // 3. IMMERSIVE APP SCREENS
  // =========================================================================
  getAppScreens(forceReload = false): Observable<any[]> {
    if (!forceReload && this.appScreens().length > 0) {
      return of(this.appScreens());
    }

    return this.http.get<any[]>(`${this.homeUrl}/immersive`).pipe(
      tap((data) => this.appScreens.set(data || []))
    );
  }

  createAppScreen(payload: any): Observable<any> {
    this.isProcessing.set(true);
    return this.http.post<any>(`${this.homeUrl}/immersive`, payload).pipe(
      tap((newScreen) => {
        this.appScreens.update((list) => [...list, newScreen || payload]);
      }),
      finalize(() => this.isProcessing.set(false))
    );
  }

  updateAppScreen(id: string, payload: any): Observable<void> {
    this.isProcessing.set(true);
    return this.http.put<void>(`${this.homeUrl}/immersive/${id}`, payload).pipe(
      tap(() => {
        this.appScreens.update((list) =>
          list.map((item) => ((item.id ?? item._id ?? item.key) === id ? { ...item, ...payload } : item))
        );
      }),
      finalize(() => this.isProcessing.set(false))
    );
  }

  deleteAppScreen(id: string): Observable<void> {
    this.isProcessing.set(true);
    return this.http.delete<void>(`${this.homeUrl}/immersive/${id}`).pipe(
      tap(() => {
        this.appScreens.update((list) =>
          list.filter((item) => (item.id ?? item._id ?? item.key) !== id)
        );
      }),
      finalize(() => this.isProcessing.set(false))
    );
  }

  // =========================================================================
  // 4. CONSULTATIONS
  // =========================================================================
  getConsultations(forceReload = false): Observable<any[]> {
    if (!forceReload && this.consultations().length > 0) {
      return of(this.consultations());
    }

    return this.http.get<any[]>(`${this.homeUrl}/consultations`).pipe(
      tap((data) => this.consultations.set(data || []))
    );
  }

  createConsultation(payload: any): Observable<any> {
    this.isProcessing.set(true);
    return this.http.post<any>(`${this.homeUrl}/consultations`, payload).pipe(
      tap((newConsult) => {
        this.consultations.update((list) => [...list, newConsult || payload]);
      }),
      finalize(() => this.isProcessing.set(false))
    );
  }

  updateConsultation(id: string, payload: any): Observable<void> {
    this.isProcessing.set(true);
    return this.http.put<void>(`${this.homeUrl}/consultations/${id}`, payload).pipe(
      tap(() => {
        this.consultations.update((list) =>
          list.map((item) => ((item.id ?? item._id ?? item.key) === id ? { ...item, ...payload } : item))
        );
      }),
      finalize(() => this.isProcessing.set(false))
    );
  }

  deleteConsultation(id: string): Observable<void> {
    this.isProcessing.set(true);
    return this.http.delete<void>(`${this.homeUrl}/consultations/${id}`).pipe(
      tap(() => {
        this.consultations.update((list) =>
          list.filter((item) => (item.id ?? item._id ?? item.key) !== id)
        );
      }),
      finalize(() => this.isProcessing.set(false))
    );
  }

  // =========================================================================
  // 5. RETREATS
  // =========================================================================
  getRetreats(forceReload = false): Observable<any[]> {
    if (!forceReload && this.retreats().length > 0) {
      return of(this.retreats());
    }

    return this.http.get<any[]>(`${this.apiBaseUrl}/retreats`).pipe(
      tap((data) => this.retreats.set(data || []))
    );
  }

  getRetreatBySlug(slug: string): Observable<any> {
    // Check cached list first
    const cached = this.retreats().find((r) => r.slug === slug);
    if (cached) {
      return of(cached);
    }
    return this.http.get<any>(`${this.apiBaseUrl}/retreats/${slug}`);
  }

  createRetreat(payload: any): Observable<any> {
    this.isProcessing.set(true);
    return this.http.post<any>(`${this.apiBaseUrl}/retreats`, payload).pipe(
      tap((newRetreat) => {
        this.retreats.update((list) => [...list, newRetreat || payload]);
      }),
      finalize(() => this.isProcessing.set(false))
    );
  }

  updateRetreat(id: string, payload: any): Observable<any> {
    this.isProcessing.set(true);
    return this.http.put<any>(`${this.apiBaseUrl}/retreats/${id}`, payload).pipe(
      tap(() => {
        this.retreats.update((list) =>
          list.map((item) => ((item.id ?? item._id) === id ? { ...item, ...payload } : item))
        );
      }),
      finalize(() => this.isProcessing.set(false))
    );
  }

  deleteRetreat(id: string): Observable<any> {
    this.isProcessing.set(true);
    return this.http.delete<any>(`${this.apiBaseUrl}/retreats/${id}`).pipe(
      tap(() => {
        this.retreats.update((list) =>
          list.filter((item) => (item.id ?? item._id) !== id)
        );
      }),
      finalize(() => this.isProcessing.set(false))
    );
  }

  // =========================================================================
  // 6. AZURE BLOB UPLOAD
  // =========================================================================
  uploadImage(file: File, folder = 'retreats'): Observable<{ url: string }> {
    this.isProcessing.set(true);
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post<{ url: string }>(`${this.apiBaseUrl}/media/upload?folder=${folder}`, formData)
      .pipe(finalize(() => this.isProcessing.set(false)));
  }
}