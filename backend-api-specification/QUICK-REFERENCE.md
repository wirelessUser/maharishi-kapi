# Backend API Quick Reference

## All Endpoints at a Glance

### 🏠 HOME PAGE API
**Base:** `/api/v1/home`

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/dashboard` | GET | ❌ | Complete home page data |
| `/featured-courses` | GET | ❌ | Featured courses |
| `/testimonials` | GET | ❌ | Testimonials & reviews |
| `/trained-consultants` | GET | ❌ | Consultant directory |
| `/stats` | GET | ❌ | Authority statistics |

**Key Features:**
- Single `/dashboard` endpoint returns all data OR individual endpoints
- Includes: hero, stats, courses, testimonials, consultants, downloads, Instagram feed

---

### 📚 COURSES PAGE API
**Base:** `/api/v1/courses`

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/` | GET | ❌ | List all courses (filtered) |
| `/categories` | GET | ❌ | Course categories |
| `/{id}` | GET | ❌ | Course details |
| `/{id}/modules` | GET | ❌ | Course modules |
| `/search` | GET | ❌ | Full-text search |
| `/{id}/related` | GET | ❌ | Related courses |

**Query Params:**
- `page`, `pageSize` - Pagination
- `category`, `level`, `format` - Filters
- `sortBy` - newest, price_low, price_high, popular, rating
- `minPrice`, `maxPrice` - Price range
- `search` - Text search

**Response Structure:**
```json
{
  "status": "success",
  "data": {
    "courses": [],
    "pagination": {},
    "filters": {}
  }
}
```

---

### 🏔️ RETREATS PAGE API
**Base:** `/api/v1/retreats`

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/` | GET | ❌ | List all retreats (filtered) |
| `/{id}` | GET | ❌ | Retreat details (full) |
| `/{id}/itinerary` | GET | ❌ | Detailed itinerary |
| `/{id}/pricing` | GET | ❌ | Pricing & seats |
| `/{id}/faqs` | GET | ❌ | FAQs |
| `/{id}/testimonials` | GET | ❌ | Testimonials |
| `/{id}/gallery` | GET | ❌ | Photo gallery |
| `/locations` | GET | ❌ | Available locations |

**Response Data:**
- Status: upcoming, ongoing, past
- Pricing tiers with availability
- Seat tracking (total/booked/available)
- Complete itinerary with daily details
- Photo galleries

---

### 💼 SERVICES PAGE API
**Base:** `/api/v1/services`

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/` | GET | ❌ | List all services |
| `/{id}` | GET | ❌ | Service details |
| `/categories` | GET | ❌ | Service categories |
| `/{id}/availability` | GET | ❌ | Available time slots |
| `/{id}/book` | POST | ✅ | Book service |
| `/faq` | GET | ❌ | Services FAQ |

**Booking Request:**
```json
{
  "preferredDate": "2026-10-15",
  "preferredTime": "14:00",
  "timezone": "IST",
  "birthDetails": {
    "birthDate": "1995-05-20",
    "birthTime": "09:30",
    "birthPlace": "Delhi"
  },
  "additionalNotes": "Questions about career"
}
```

**Booking Response:**
```json
{
  "bookingId": "uuid",
  "serviceName": "Vedic Astrology Consultation",
  "scheduledDate": "2026-10-15T14:00:00Z",
  "price": 90,
  "status": "confirmed",
  "conferenceLink": "https://zoom.us/...",
  "instructions": "Join 5 minutes early..."
}
```

---

### 👤 ABOUT PAGE API
**Base:** `/api/v1/about`

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/founder` | GET | ❌ | Founder bio & credentials |
| `/stats` | GET | ❌ | Authority statistics |
| `/master-roles` | GET | ❌ | All 5 master roles |
| `/master-roles/{id}` | GET | ❌ | Specific role details |
| `/lineage` | GET | ❌ | 9-generation lineage |
| `/press` | GET | ❌ | Press coverage |
| `/institute` | GET | ❌ | Institute info |

**Master Roles (5 total):**
1. Medical Jyotish & Horary Astrology
2. Sthapatya Vastu Consultant
3. Vedic Numerologist & Vibrational Architect
4. Vedic Somatic Therapist & Spiritual Mentor
5. Corporate Mentor & Research Guide

---

### 📰 BLOG PAGE API
**Base:** `/api/v1/blog`

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/articles` | GET | ❌ | List articles (filtered) |
| `/articles/{slug}` | GET | ❌ | Article detail |
| `/featured` | GET | ❌ | Featured article |
| `/trending` | GET | ❌ | Trending articles |
| `/categories` | GET | ❌ | Blog categories |
| `/articles/{slug}/related` | GET | ❌ | Related articles |
| `/search` | GET | ❌ | Full-text search |
| `/authors` | GET | ❌ | Blog authors |
| `/authors/{id}/articles` | GET | ❌ | Author's articles |
| `/newsletter/subscribe` | POST | ❌ | Newsletter signup |
| `/articles/{slug}/views` | POST | ❌ | Track view |

**Categories:** Astrology, Vastu, Ayurveda, Numerology, Culture

**Newsletter Subscribe:**
```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

---

## Database Tables Summary

### Home Page
- `HomeStats` - Statistics
- `Testimonial` - Reviews
- `TrainedConsultant` - Consultant directory

### Courses
- `Course` - Course details
- `CourseModule` - Modules & topics
- `CourseTestimonial` - Reviews
- `CourseFAQ` - FAQs
- `Instructor` - Teacher info

### Retreats
- `Retreat` - Main retreat data
- `RetreatStop` - Route stops
- `RetreatPractice` - Practices
- `ItineraryDay` - Daily schedule
- `RetreatPricing` - Pricing tiers
- `RetreatFAQ` - FAQs
- `RetreatTestimonial` - Reviews

### Services
- `ConsultationService` - Service details
- `ServiceBooking` - Bookings
- `ServiceFAQ` - FAQs
- `ServiceTestimonial` - Reviews

### About
- `FounderProfile` - Founder info
- `AuthorityStats` - Statistics
- `MasterRole` - Role details
- `Lineage` - Heritage info
- `PressArticle` - Media coverage
- `Institute` - Institute info

### Blog
- `Article` - Blog posts
- `BlogAuthor` - Authors
- `BlogCategory` - Categories
- `NewsletterSubscriber` - Email list
- `ArticleView` - View tracking

---

## Common Query Parameters

### Pagination
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 12-20)

### Sorting
- `sortBy` - newest, oldest, popular, trending, price_low, price_high, rating

### Filtering
- `category` - Category name
- `level` - Beginner, Intermediate, Advanced, Professional
- `status` - upcoming, past, ongoing
- `featured` - true/false
- `minPrice` / `maxPrice` - Price range

### Search
- `search` / `q` - Search query
- `limit` - Result limit (default: 10)

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Server Error |

---

## Authentication

### For Protected Endpoints
```bash
Authorization: Bearer {JWT_TOKEN}
```

### Getting JWT Token
Implement separate auth endpoint:
```
POST /api/v1/auth/login
```

---

## Caching Strategy

| Endpoint Type | TTL | Cache Key Pattern |
|---------------|-----|-------------------|
| Static content (about, lineage) | 24 hours | `{resource}_{id}` |
| Lists (courses, retreats, articles) | 30 minutes | `{resource}_list_{filters}` |
| Details (course, retreat, article) | 30 minutes | `{resource}_detail_{id}` |
| Availability (services, retreats) | 5-15 minutes | `{resource}_availability_{id}_{date}` |
| Real-time data (bookings, views) | No cache | N/A |

---

## Common Response Format

### Success
```json
{
  "status": "success",
  "data": {
    // ... resource data
  }
}
```

### Error
```json
{
  "status": "error",
  "message": "Human-readable error message",
  "errors": {
    "fieldName": "Field-specific error"
  }
}
```

### List Response
```json
{
  "status": "success",
  "data": {
    "items": [],
    "pagination": {
      "currentPage": 1,
      "pageSize": 12,
      "totalRecords": 50,
      "totalPages": 5
    }
  }
}
```

---

## Development Priority

### Priority 1 (MVP)
- [ ] Course listing & details
- [ ] Retreat listing & details
- [ ] Services listing

### Priority 2
- [ ] Home page aggregation
- [ ] About page (founder, stats, roles)
- [ ] Blog articles

### Priority 3
- [ ] Service booking
- [ ] Newsletter
- [ ] Admin endpoints
- [ ] Advanced caching

---

## Important Notes

1. **All list endpoints are paginated** - Include pagination info in responses
2. **All content endpoints support filtering** - Implement smart filtering
3. **Categories are dynamic** - Query database, don't hardcode
4. **Timezone support** - Services API needs timezone conversion
5. **Image URLs** - Most content has image URLs (store paths, return full URLs)
6. **JSON fields** - Arrays stored as JSON in some tables (parse/serialize)
7. **Date formats** - Use ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)
8. **Soft deletes recommended** - Use isActive flag instead of actual deletion

---

## URL Structure Examples

```
GET  /api/v1/courses
GET  /api/v1/courses?category=Astrology&level=Beginner&page=1
GET  /api/v1/courses/astrology-level-1
GET  /api/v1/courses/astrology-level-1/modules
GET  /api/v1/courses/search?q=vedic

GET  /api/v1/retreats
GET  /api/v1/retreats/himalayan-sadhana-retreat
GET  /api/v1/retreats/himalayan-sadhana-retreat/itinerary
GET  /api/v1/retreats/himalayan-sadhana-retreat/pricing

GET  /api/v1/services
GET  /api/v1/services/vedic-consultation
GET  /api/v1/services/vedic-consultation/availability?date=2026-10-15
POST /api/v1/services/vedic-consultation/book

GET  /api/v1/blog/articles
GET  /api/v1/blog/articles/saturn-returns
GET  /api/v1/blog/articles?category=Astrology&page=1
GET  /api/v1/blog/search?q=meditation
```

---

## Environment Variables Needed

```
DB_CONNECTION_STRING=Server=...;Database=maharishi_kapi_db;...
JWT_SECRET=your-secret-key-here
REDIS_CONNECTION_STRING=localhost:6379
API_BASE_URL=https://api.maharishikapi.com
FRONTEND_URL=https://maharishikapi.com
SMTP_HOST=smtp.gmail.com
SMTP_USER=email@gmail.com
SMTP_PASSWORD=password
```

---

## File Organization

```
/api-specification/
├── README.md                      # Full documentation
├── QUICK-REFERENCE.md             # This file
├── 01-home-page-api.yaml
├── 02-courses-page-api.yaml
├── 03-retreats-page-api.yaml
├── 04-services-page-api.yaml
├── 05-about-page-api.yaml
└── 06-blog-page-api.yaml
```

