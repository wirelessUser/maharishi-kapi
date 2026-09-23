# Maharishi Kapi Backend API Specification

## Overview

This directory contains comprehensive YAML API specifications for the .NET backend that powers the Maharishi Kapi Institute website frontend. Each file documents the endpoints, request/response schemas, database models, and caching strategy needed for a specific page or feature.

**Technology Stack:**
- Backend: .NET 8 (C#)
- Database: SQL Server
- Authentication: JWT Token
- Caching: Redis (optional but recommended)
- API Style: RESTful with JSON

---

## API Files Index

### 1. **Home Page API** (`01-home-page-api.yaml`)
**Base URL:** `/api/v1/home`

Provides all data for the home page including hero section, statistics, featured courses, testimonials, trained consultants, and social media feeds.

**Key Endpoints:**
- `GET /dashboard` - Complete home page data (recommended)
- `GET /featured-courses` - Featured courses carousel
- `GET /testimonials` - Testimonials and reviews
- `GET /trained-consultants` - Consultant directory
- `GET /stats` - Authority statistics

**Main Database Tables:**
- HomeStats
- Testimonial
- TrainedConsultant

---

### 2. **Courses Page API** (`02-courses-page-api.yaml`)
**Base URL:** `/api/v1/courses`

Comprehensive course management including listing, filtering, search, and detailed course information.

**Key Endpoints:**
- `GET /` - List all courses with filtering/pagination
- `GET /categories` - Available course categories
- `GET /{id}` - Course detail with modules & FAQs
- `GET /{id}/modules` - Course modules and topics
- `GET /search` - Full-text search
- `GET /{id}/related` - Related/recommended courses

**Main Database Tables:**
- Course
- CourseModule
- CourseTestimonial
- CourseFAQ
- Instructor

**Features:**
- Advanced filtering (category, level, price, format)
- Pagination support
- Search functionality
- Related courses recommendations

---

### 3. **Retreats Page API** (`03-retreats-page-api.yaml`)
**Base URL:** `/api/v1/retreats`

Complete retreat management including listings, details, pricing, itineraries, and bookings.

**Key Endpoints:**
- `GET /` - List all retreats with filtering
- `GET /{id}` - Retreat detail page
- `GET /{id}/itinerary` - Detailed itinerary
- `GET /{id}/pricing` - Pricing tiers and availability
- `GET /{id}/faqs` - Retreat FAQs
- `GET /{id}/testimonials` - Retreat testimonials
- `GET /locations` - Available retreat locations
- `GET /{id}/gallery` - Photo gallery

**Main Database Tables:**
- Retreat
- RetreatStop
- RetreatPractice
- ItineraryDay
- RetreatPricing
- RetreatFAQ
- RetreatTestimonial

**Features:**
- Retreat status tracking (upcoming, ongoing, past)
- Real-time seat availability
- Multi-tier pricing
- Photo galleries

---

### 4. **Services Page API** (`04-services-page-api.yaml`)
**Base URL:** `/api/v1/services`

1-on-1 consultation services management including booking, availability, and pricing.

**Key Endpoints:**
- `GET /` - List all services with filtering
- `GET /{id}` - Service detail
- `GET /categories` - Service categories
- `POST /{id}/book` - Book a consultation (AUTH REQUIRED)
- `GET /{id}/availability` - Available time slots
- `GET /faq` - Services FAQ

**Main Database Tables:**
- ConsultationService
- ServiceBooking
- ServiceFAQ
- ServiceTestimonial

**Features:**
- Consultation booking system
- Real-time availability checking
- Birth details collection for personalized readings
- Timezone support
- Conference link generation

---

### 5. **About Page API** (`05-about-page-api.yaml`)
**Base URL:** `/api/v1/about`

Founder biography, authority credentials, roles, lineage, and press coverage.

**Key Endpoints:**
- `GET /founder` - Founder biography and credentials
- `GET /stats` - Authority statistics
- `GET /master-roles` - The 5 master professional roles
- `GET /master-roles/{id}` - Specific role details
- `GET /lineage` - 9-generation lineage information
- `GET /press` - Press coverage and media appearances
- `GET /institute` - Institute information

**Main Database Tables:**
- FounderProfile
- AuthorityStats
- MasterRole
- Lineage
- LineageGeneration
- PressArticle
- Institute
- InstituteLocation

**Features:**
- Comprehensive founder profile
- 5 distinct professional roles with methodologies
- 9-generation Vedic lineage tracking
- Press/media coverage
- Multiple institute locations

---

### 6. **Blog Page API** (`06-blog-page-api.yaml`)
**Base URL:** `/api/v1/blog`

Blog article management, categorization, search, and newsletter subscription.

**Key Endpoints:**
- `GET /articles` - List articles with filtering
- `GET /articles/{slug}` - Article detail with full content
- `GET /featured` - Featured article
- `GET /trending` - Trending articles
- `GET /categories` - Blog categories
- `GET /articles/{slug}/related` - Related articles
- `GET /search` - Full-text search
- `POST /newsletter/subscribe` - Newsletter subscription
- `GET /authors` - Blog authors

**Main Database Tables:**
- Article
- BlogAuthor
- BlogCategory
- NewsletterSubscriber
- ArticleView

**Features:**
- Multi-category blog system
- Featured and trending articles
- Newsletter subscription
- Author management
- View tracking
- Full-text search

---

## Architecture Patterns

### Authentication
- **Public Endpoints:** No authentication required (courses, retreats, blog, about, home)
- **Protected Endpoints:** JWT token required (service bookings, user profile)
- **Authorization:** Role-based access control (RBAC) for admin functions

### Caching Strategy
All endpoints include recommended Redis caching TTL values:
- **Static Content:** 24 hours (86400 seconds)
- **Frequently Accessed:** 30 minutes (1800 seconds)
- **Real-time Data:** 5-15 minutes (300-900 seconds)

Cache keys use parameters to create variants (e.g., `blog_articles_{page}_{category}_{sort}`)

### Pagination
- Default page size: 12-20 items
- Supports custom page sizes via `pageSize` parameter
- Returns pagination metadata with each response

### Error Handling
Standard error response format:
```json
{
  "status": "error",
  "message": "Human readable error message",
  "errors": {
    "field": "error description"
  }
}
```

### Filtering & Sorting
- All list endpoints support category filtering
- Dynamic sort options (newest, popular, price, rating)
- Price range filters with min/max
- Search functionality across all major content types

---

## Database Design Patterns

### Core Tables Across APIs

#### User/Authentication Related
- User (not detailed in this spec, but required)
- UserRole
- UserProfile

#### Content Management
- All content tables include:
  - `id` (Guid, Primary Key)
  - `isActive` (bool)
  - `displayOrder` (int)
  - `createdAt` (DateTime)
  - `updatedAt` (DateTime)

#### Relationships
- Foreign key relationships link:
  - Services → Instructors
  - Courses → Modules, Testimonials, FAQs
  - Retreats → Pricing, Itinerary, FAQs
  - Articles → Authors, Categories

---

## API Usage Examples

### 1. Getting Home Page Data
```bash
GET /api/v1/home/dashboard
Response: Complete home page data structure
Cache: 1 hour
```

### 2. Listing Courses with Filter
```bash
GET /api/v1/courses?category=Astrology&level=Beginner&sortBy=price_low&page=1&pageSize=12
Response: Paginated course list
Cache: 30 minutes with variant key
```

### 3. Getting Retreat Details
```bash
GET /api/v1/retreats/himalayan-sadhana-retreat
Response: Full retreat detail page data
Cache: 30 minutes
```

### 4. Booking a Service (Authenticated)
```bash
POST /api/v1/services/vedic-consultation/book
Headers: Authorization: Bearer {JWT_TOKEN}
Body: {
  "preferredDate": "2026-10-15",
  "preferredTime": "14:00",
  "timezone": "IST",
  "birthDetails": {...}
}
Response: Booking confirmation with conference link
```

### 5. Searching Blog Articles
```bash
GET /api/v1/blog/search?q=saturn%20returns&limit=10
Response: Matching articles
```

---

## Development Checklist

### Phase 1: Core Setup
- [ ] .NET 8 project structure
- [ ] Entity Framework Core models
- [ ] SQL Server database
- [ ] JWT authentication
- [ ] Dependency injection setup

### Phase 2: API Implementation (by page)
- [ ] Home Page API
  - [ ] Statistics endpoints
  - [ ] Featured courses
  - [ ] Testimonials
  - [ ] Trained consultants
  
- [ ] Courses API
  - [ ] Course listing with filters
  - [ ] Course details
  - [ ] Search functionality
  - [ ] Related courses

- [ ] Retreats API
  - [ ] Retreat listing
  - [ ] Detail pages
  - [ ] Availability tracking
  - [ ] Booking system (Phase 3)

- [ ] Services API
  - [ ] Services listing
  - [ ] Availability checking
  - [ ] Booking system

- [ ] About API
  - [ ] Founder profile
  - [ ] Master roles
  - [ ] Press coverage

- [ ] Blog API
  - [ ] Article management
  - [ ] Search and filtering
  - [ ] Newsletter subscription

### Phase 3: Advanced Features
- [ ] User authentication
- [ ] Booking system
- [ ] Payment integration
- [ ] Email notifications
- [ ] Admin dashboard

### Phase 4: Performance & Security
- [ ] Redis caching implementation
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Input validation
- [ ] Security headers
- [ ] Database optimization & indexing

---

## Data Import & Migration

### Existing Frontend Data Sources
All data currently lives in frontend TypeScript files:
- `src/app/data/courses.ts` - Course details
- `src/app/data/retreats.ts` - Retreat information
- Services data in `services-page.ts`
- About page data in `about-page.ts`
- Blog articles in `blog-page.ts`

**Import Strategy:**
1. Parse TypeScript data structures
2. Create database seed scripts
3. Run migrations to populate initial data
4. Set up admin endpoints for content updates

---

## API Versioning & Deployment

- **Current Version:** 1.0
- **Base URL:** `https://api.maharishikapi.com/api/v1`
- **Environments:**
  - Development: `http://localhost:5000/api/v1`
  - Staging: `https://staging-api.maharishikapi.com/api/v1`
  - Production: `https://api.maharishikapi.com/api/v1`

---

## Next Steps

1. **Set up .NET project** with Entity Framework Core
2. **Create database schema** based on provided models
3. **Implement authentication** (JWT)
4. **Implement endpoints** following this specification
5. **Add caching layer** with Redis
6. **Create data seeding** scripts for initial content
7. **Set up CI/CD pipeline** for deployments
8. **Write API documentation** with Swagger/OpenAPI

---

## Support & Questions

For questions about specific endpoints or implementations, refer to the individual YAML files for detailed schema information.

**Contact:** development@maharishikapi.com

