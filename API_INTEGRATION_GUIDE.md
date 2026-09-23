# Angular + ASP.NET Core API Integration Guide

## ✅ Setup Complete

### Files Created:
1. **Environment Configuration**
   - `src/environments/environment.development.ts` → `https://localhost:7263/api/v1`
   - `src/environments/environment.ts` → Production API URL

2. **Models & Types**
   - `src/app/core/models/home.models.ts` → All DTOs and interfaces

3. **Service Layer**
   - `src/app/core/services/home.service.ts` → Typed HTTP methods for all endpoints

4. **App Configuration**
   - Updated `src/app/app.config.ts` → Added `provideHttpClient(withFetch())`

---

## 📡 Backend CORS Configuration (.NET `Program.cs`)

Add this to your `.NET` backend to allow requests from Angular dev server:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("AllowAngularDev");
app.MapControllers();

app.Run();
```

---

## 🔌 Component Integration Pattern

### Example: Integrating Stats Component

Update `src/app/components/stats/stats.ts`:

```typescript
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { HomeService } from '../../core/services/home.service';
import { HomeStatsDto } from '../../core/models/home.models';

interface TickerItem {
  type: 'stat' | 'logo';
  key: string;
  value?: string;
  label?: string;
  sanskritTag?: string;
  img?: string;
  alt?: string;
  dark?: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  selector: 'app-stats',
  styleUrl: './stats.css',
  templateUrl: './stats.html',
})
export class Stats implements OnInit {
  tickerItems = signal<TickerItem[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  // Fallback stats for graceful degradation
  private readonly fallbackStats: TickerItem[] = [
    {
      type: 'stat',
      key: 'generations',
      value: '9',
      label: 'Generations of Lineage',
      sanskritTag: 'नव पीढ़ी परम्परा',
    },
    // ... rest of fallback items
  ];

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.loadStats();
  }

  private loadStats() {
    this.homeService.getStats().subscribe({
      next: (response) => {
        if (response.data && response.data.length > 0) {
          const apiStats = response.data
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((stat: HomeStatsDto) => ({
              type: 'stat' as const,
              key: stat.id,
              value: stat.num.toString(),
              label: stat.label,
              sanskritTag: stat.sub,
            }));
          this.tickerItems.set(apiStats);
        } else {
          this.tickerItems.set(this.fallbackStats);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load stats:', err);
        this.error.set('Unable to load statistics');
        this.tickerItems.set(this.fallbackStats);
        this.loading.set(false);
      }
    });
  }
}
```

---

## 🎯 Available Service Methods

### Query Methods (Read-Only)
```typescript
// Dashboard (all data at once)
homeService.getDashboard(): Observable<ApiResponse<DashboardDto>>

// Featured Courses
homeService.getFeaturedCourses(limit?: number): Observable<ApiResponse<CourseCardDto[]>>

// Testimonials (sorted & paginated)
homeService.getTestimonials(limit?: number, sort?: 'recent' | 'rating'): Observable<ApiResponse<TestimonialDto[]>>

// Trained Consultants (with optional filters)
homeService.getTrainedConsultants(limit?: number, specialization?: string, location?: string): Observable<ApiResponse<TrainedConsultantDto[]>>

// Home Stats
homeService.getStats(): Observable<ApiResponse<HomeStatsDto[]>>
```

### Mutation Methods (Admin Only)
```typescript
// Stats
homeService.createStats(dto: CreateHomeStatsDto): Observable<ApiResponse<HomeStatsDto>>
homeService.updateStats(id: string, dto: UpdateHomeStatsDto): Observable<ApiResponse<HomeStatsDto>>
homeService.deleteStats(id: string): Observable<ApiResponse<boolean>>

// Testimonials
homeService.createTestimonial(dto: CreateTestimonialDto): Observable<ApiResponse<TestimonialDto>>
homeService.updateTestimonial(id: string, dto: UpdateTestimonialDto): Observable<ApiResponse<TestimonialDto>>
homeService.deleteTestimonial(id: string): Observable<ApiResponse<boolean>>

// Trained Consultants
homeService.createTrainedConsultant(dto: CreateTrainedConsultantDto): Observable<ApiResponse<TrainedConsultantDto>>
homeService.updateTrainedConsultant(id: string, dto: UpdateTrainedConsultantDto): Observable<ApiResponse<TrainedConsultantDto>>
homeService.deleteTrainedConsultant(id: string): Observable<ApiResponse<boolean>>
```

---

## 🧪 Testing API Integration

### 1. Start the backend
```bash
# From .NET project directory
dotnet run --urls "https://localhost:7263"
```

### 2. Start Angular dev server
```bash
npm start
```

### 3. Check CORS headers in browser DevTools
- Go to `http://localhost:4200`
- Open DevTools → Network tab
- Look for API calls to `https://localhost:7263/api/v1/*`
- Check response headers for `Access-Control-Allow-Origin: http://localhost:4200`

### 4. Test with a simple component
```typescript
// In any component's ngOnInit:
this.homeService.getDashboard().subscribe(
  response => console.log('Dashboard:', response),
  error => console.error('API Error:', error)
);
```

---

## 🔒 Error Handling Best Practices

```typescript
private loadData() {
  this.homeService.getStats().subscribe({
    next: (response) => {
      // Success: response.data contains the data
      this.data.set(response.data);
      this.loading.set(false);
    },
    error: (error) => {
      // Log and fallback to defaults
      console.error('API Error:', error);
      this.error.set('Failed to load data');
      this.data.set(this.defaultData);
      this.loading.set(false);
    }
  });
}
```

---

## 📝 Next Steps

1. **Backend**: Ensure `HomeController.cs` returns `ApiResponse<T>` wrapper
2. **Environment**: Update `environment.ts` with production API URL
3. **CORS**: Add the CORS policy to `.NET` backend
4. **Components**: Integrate `HomeService` into components one-by-one
5. **Testing**: Verify API calls work in browser DevTools

---

## 🚀 Production Deployment

For production:
- Update `src/environments/environment.ts` with actual backend URL
- Set up authentication/JWT tokens if needed
- Add request/response interceptors for headers
- Monitor API performance with browser DevTools Network tab
