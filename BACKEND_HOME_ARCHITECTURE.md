# Maharishi Kapi Home Page Backend Architecture Guide

## Overview

This document provides a visual and architectural overview of the Maharishi Kapi home page backend system. It maps the Angular frontend components to their backend API endpoints and data models.

---

## 1. Frontend Component Hierarchy & Page Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      HOME PAGE (Route: /)                       │
│              [Angular Standalone Components, SSR]               │
└─────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
         ┌──────▼────┐    ┌─────▼────┐    ┌────▼──────┐
         │ HeroSection│    │Generations│    │   Stats   │
         └───────────┘    └──────────┘    └───────────┘
                │               │              │
         GET /api/hero  GET /api/lineage/  GET /api/stats/
                                generations    ticker
                
         [continues vertically...]
         
         ├─ FeaturedCourses      → GET /api/courses/featured
         ├─ Legacy               → GET /api/lineage/pillars
         ├─ Roles                → GET /api/roles (carousel, 10 items)
         ├─ Journey              → GET /api/journey-paths (5 paths)
         ├─ Immersive            → GET /api/app-features (6 screens)
         ├─ Consultation         → GET /api/consultations/tiers (3 tiers)
         ├─ TrainedConsultants   → GET /api/consultants (N consultants)
         ├─ Stories              → GET /api/reviews/google
         ├─ Downloads            → GET /api/sacred-codex
         └─ Instagram            ├─ GET /api/social/youtube-videos
                                  └─ GET /api/social/instagram-reels
```

---

## 2. Component-to-Endpoint Mapping

| Position | Component | Angular File | Backend Endpoint | Data Model | Purpose |
|----------|-----------|--------------|------------------|-----------|---------|
| 1 | Hero Section | `hero-section.ts` | `/api/hero` | `HeroSection` | Zodiac symbols & hero intro |
| 2 | Generations | `generations.ts` | `/api/lineage/generations` | `Generation[]` | 9-gen lineage family tree |
| 3 | Stats Ticker | `stats.ts` | `/api/stats/ticker` | `TickerItem[]` | Key metrics + partner logos |
| 4 | Featured Courses | `featured-courses.ts` | `/api/courses/featured` | `FeaturedCourse[]` | Top 3 courses (limit=3) |
| 5 | Legacy Pillars | `legacy.ts` | `/api/lineage/pillars` | `LineagePillar[]` | 4 core Vedic disciplines |
| 6 | Roles Carousel | `roles.ts` | `/api/roles` | `Role[]` | 10 professional roles/avatars |
| 7 | Journey Paths | `journey.ts` | `/api/journey-paths` | `JourneyPath[]` | 5 life journey entry points |
| 8 | Immersive App | `immersive.ts` | `/api/app-features` | `AppScreen[]` | 6 mobile app feature screens |
| 9 | Consultation | `consultation.ts` | `/api/consultations/tiers` | `ConsultationTier[]` | 3 service tiers |
| 10 | Trained Consultants | `trained-consultants.ts` | `/api/consultants` | `CertifiedConsultant[]` | Consultant network (3+ on home) |
| 11 | Stories (Reviews) | `stories.ts` | `/api/reviews/google` | `GoogleReviewItem[]` | Testimonials & reviews |
| 12 | Downloads | `downloads.ts` | `/api/sacred-codex` | `SacredCodex[]` | Sacred text PDFs (4 items) |
| 13 | Instagram | `instagram.ts` | `/api/social/youtube-videos` | `Video[]` | YouTube videos (4 items) |
| | | | `/api/social/instagram-reels` | `Reel[]` | Instagram reels (4 items) |

---

## 3. Data Model Relationships & Dependencies

```
┌────────────────────────────────────────────────────────────────┐
│                      CORE DATA MODELS                          │
└────────────────────────────────────────────────────────────────┘

HeroSection (Static)
├── zodiacSigns: string[] (12 items)
└── Used by: Hero component

Generation (Lineage)
├── key, devanagariNumber, name, specialty, initials, photo, shastricTitle
├── Count: Exactly 7 (Gen I → Gen VII = Acharya Alok)
└── Used by: Generations component

LineagePillar (Vedic Discipline)
├── devanagari, label
├── Count: Exactly 4 (Jyotish, Vastu, Ayurveda, Sadhana)
└── Used by: Legacy component

TickerItem (Mixed Stats & Logos)
├── type: 'stat' | 'logo'
├── For stats: value, label, sanskritTag
├── For logos: img, alt, dark
├── Count: Exactly 6 (alternating pattern)
└── Used by: Stats component

FeaturedCourse
├── id, title, sanskritTag, category, image, price, originalPrice
├── duration, rating
├── Count on home: 3 (paginate for courses-page)
└── Used by: FeaturedCourses component

Role (Professional Avatar)
├── key, devanagariNum, icon (FontAwesome), title, specialization
├── desc, image, pressLogos
├── Count: Exactly 10 (roles 01-10)
├── Role 10 (speaker) has pressLogos=true for press media display
└── Used by: Roles carousel component

JourneyPath (Life Journey Entry Point)
├── id, devanagariNum, sanskritTag, prompt, title, subtitle
├── deck (description), image, targetRoute, routeLabel
├── Count: Exactly 5 unique paths
├── Routes: /retreats, /courses, /services, /residential, /services
└── Used by: Journey selection component

AppScreen (Mobile App Feature)
├── id, title, sanskritTitle, tag, headline, description, image
├── Count: Exactly 6 screens (first is minimal, 2-6 fully described)
└── Used by: Immersive app showcase component

ConsultationTier (Service Offering)
├── id, devanagariNum, title, sanskritTag, category, image
├── price, originalPrice, duration, summary
├── Count: Exactly 3 tiers
└── Used by: Consultation component

CertifiedConsultant (Consultant Profile)
├── key, devanagariNum, name, sanskritTag, specialization
├── photo, experience, location
├── Count: 3 on home (expandable to N)
└── Used by: TrainedConsultants carousel component

GoogleReviewItem (Testimonial)
├── authorName, initials, location, avatarBg
├── rating (1-5), relativeTime, tag, reviewText
├── Count: 3+ on home (can be paginated)
├── Aggregate: 4.9 ⭐ (1200+ reviews)
└── Used by: Stories component

SacredCodex (Downloadable Resource)
├── id, devanagariNum, title, sanskritTitle, subtitle
├── category, pages, fileSize, shlokaSnippet, downloadUrl
├── Count: Exactly 4 texts
└── Used by: Downloads section component

Video (YouTube Content)
├── key, title, category, duration, thumb, url
├── Count: 4 on home (from @maharishikapi YouTube)
└── Used by: Instagram social feed component

Reel (Instagram Content)
├── key, titleHindi, subtitleHindi, category, url, image (optional)
├── image auto-fetched from Instagram metadata if not provided
├── Count: 4 on home (from @acharya_alok_awasthi Instagram)
└── Used by: Instagram social feed component
```

---

## 4. API Endpoint Structure

```
/api/
├── /hero (GET)                              [Static, cache 24h]
│
├── /lineage/
│   ├── /generations (GET)                   [Static, cache 7d]
│   └── /pillars (GET)                       [Static, cache 7d]
│
├── /stats/
│   └── /ticker (GET)                        [Dynamic, cache 1h]
│
├── /courses/
│   └── /featured (GET, ?limit=3)            [Dynamic, cache 1h]
│
├── /roles (GET)                             [Static, cache 7d]
│
├── /journey-paths (GET)                     [Static, cache 7d]
│
├── /app-features (GET)                      [Static, cache 7d]
│
├── /consultations/
│   └── /tiers (GET, ?service_type=optional) [Dynamic, cache 1h]
│
├── /consultants (GET, ?specialty, ?location) [Dynamic, cache 1h]
│   └── [Expandable for consultant detail page]
│
├── /reviews/
│   └── /google (GET, ?limit=3, ?min_rating) [Dynamic, cache 30min]
│
├── /sacred-codex (GET, ?category=optional)  [Static, cache 7d]
│
└── /social/
    ├── /youtube-videos (GET, ?limit=4)      [Dynamic, cache 1h]
    └── /instagram-reels (GET, ?limit=4)     [Dynamic, cache 1h]
```

---

## 5. Data Flow Diagram

```
┌──────────────┐
│   Browser    │
│   (Angular   │
│   Frontend)  │
└──────┬───────┘
       │
       │ HTTP Requests (JSON)
       │ ComponentWillLoad() → ngOnInit()
       │ Uses HttpClient.get()
       │
       ▼
┌─────────────────────────────────┐
│   Express/Node.js Backend       │
│   (or similar REST API)         │
├─────────────────────────────────┤
│ 1. Request Router               │
│    Maps GET /api/* → handler    │
├─────────────────────────────────┤
│ 2. Controllers/Handlers         │
│    Apply business logic         │
│    Add cache headers            │
├─────────────────────────────────┤
│ 3. Services Layer               │
│    Fetch from DB or cache       │
│    Transform to response format │
├─────────────────────────────────┤
│ 4. Cache Layer (Redis/Memory)   │
│    Aggressive: 7d for static    │
│    Moderate: 1h for dynamic     │
├─────────────────────────────────┤
│ 5. Database (SQL/NoSQL)         │
│    PostgreSQL, MongoDB, etc.    │
│    Normalized schema            │
│    Indexes for fast lookup      │
└─────────────────────────────────┘
       │
       │ HTTP Response (JSON, cached)
       │
       ▼
┌──────────────────────────────────┐
│   Angular HttpClient             │
│   Handles response data          │
│   Transforms via interceptors    │
│   Stores in component signals    │
└──────────────────────────────────┘
       │
       │ Binds to template
       │ {{ data.property }}
       │ *ngFor, @if, @for
       │
       ▼
┌──────────────────────────────────┐
│   Rendered HTML                  │
│   Browser displays component     │
│   Styling via Tailwind + brand   │
│   tokens (--color-kapi-*)        │
└──────────────────────────────────┘
```

---

## 6. Caching Strategy by Component

```
STATIC CONTENT (Aggressive Cache: 7 days or more)
├── Hero Section              → Cache: 24h (rarely changes)
├── Lineage (Generations)     → Cache: 7d (historical data)
├── Legacy (Pillars)          → Cache: 7d (core brand pillars)
├── Roles (10 avatars)        → Cache: 7d (professional profile)
├── Journey Paths (5 paths)   → Cache: 7d (fixed entry points)
├── App Features (6 screens)  → Cache: 7d (static screenshots)
└── Sacred Codex (4 texts)    → Cache: 7d (archival content)

SEMI-DYNAMIC CONTENT (Moderate Cache: 30 min - 1 hour)
├── Stats Ticker              → Cache: 1h (student count may update)
├── Featured Courses          → Cache: 1h (inventory, pricing changes)
├── Consultation Tiers        → Cache: 1h (pricing, availability)
├── Consultants               → Cache: 1h (profiles, locations)
├── Reviews                   → Cache: 30min (new reviews added)
├── YouTube Videos            → Cache: 1h (metadata)
└── Instagram Reels           → Cache: 1h (thumbnails)

CACHE INVALIDATION TRIGGERS
├── Manual: Admin updates content → Bust cache immediately
├── Time-based: TTL expiration → Refetch automatically
├── Event-based: New review added → Refresh reviews endpoint
└── On-demand: Component requests fresh data → Force refetch
```

---

## 7. Database Schema (Normalized)

```
COURSES TABLE
├── id (PK, UUID)
├── title, sanskritTag, category
├── imageUrl, description
├── price, originalPrice
├── duration, rating
├── isFeatured (boolean)
├── createdAt, updatedAt
└── Index: (isFeatured, createdAt)

ROLES TABLE
├── id (PK, UUID)
├── key (unique), devanagariNum
├── icon (FontAwesome class)
├── title, specialization, description
├── imageUrl, pressLogos
├── displayOrder (for carousel)
└── Index: (displayOrder)

CONSULTANTS TABLE
├── id (PK, UUID)
├── key, devanagariNum
├── name, sanskritTag, specialization
├── photoUrl, experience, location
├── isActive (boolean)
├── createdAt, updatedAt
└── Index: (specialization, isActive)

CONSULTATION_SERVICES TABLE
├── id (PK, UUID)
├── title, sanskritTag, category
├── imageUrl, price, originalPrice
├── duration, summary
├── createdAt, updatedAt
└── Index: (category, createdAt)

REVIEWS TABLE
├── id (PK, UUID)
├── authorName, location, rating
├── reviewText, tag, source
├── isFeatured (boolean)
├── createdAt, updatedAt
└── Index: (isFeatured, rating, createdAt)

SOCIAL_MEDIA_CONTENT TABLE
├── id (PK, UUID)
├── contentType (youtube_video, instagram_reel)
├── externalId (YouTube ID or Instagram shortcode)
├── title, category, url, thumbnailUrl
├── duration (for videos), isActive
├── createdAt, updatedAt
└── Index: (contentType, isActive, createdAt)

LINEAGE TABLE
├── id (PK, UUID)
├── generation (1-9)
├── name, specialty, shastricTitle
├── photoUrl, devanagariNum
├── displayOrder
└── Index: (generation)

SACRED_CODEX TABLE
├── id (PK, UUID)
├── title, sanskritTitle, subtitle
├── category, pages, fileSize
├── shlokaSnippet, downloadUrl
├── createdAt, updatedAt
└── Index: (category)
```

---

## 8. Request/Response Flow Example

### Request: GET /api/courses/featured?limit=3

```http
GET /api/courses/featured?limit=3 HTTP/1.1
Host: api.maharishikapi.com
Accept: application/json
Accept-Encoding: gzip, deflate
User-Agent: Angular HttpClient
```

### Backend Processing:

1. **Router** matches `/api/courses/featured`
2. **Controller** receives limit=3 param
3. **Cache Check** looks for cached response
   - If found & not expired → Return cached data
   - If expired or missing → Proceed to DB query
4. **Database Query**
   ```sql
   SELECT id, title, sanskritTag, category, imageUrl, price, 
          originalPrice, duration, rating
   FROM courses
   WHERE isFeatured = true
   ORDER BY displayOrder ASC
   LIMIT 3
   ```
5. **Response Transform** formats data to match `FeaturedCourse[]` interface
6. **Cache Store** saves response with TTL=3600 (1 hour)
7. **Send Response** with cache headers

### Response: HTTP 200 OK

```json
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: public, max-age=3600
X-Cache: HIT

[
  {
    "id": "astro-1",
    "title": "Vedic Astrology Foundations — Level 1",
    "sanskritTag": "पाराशरी ज्योतिष",
    "category": "Astrology",
    "image": "https://mkvnstorage.blob.core.windows.net/courseimages/...",
    "price": 145,
    "originalPrice": 220,
    "duration": "12 Weeks • Live & Self-Paced",
    "rating": "4.9 (1.2k+ Sadhaks)"
  },
  ...
]
```

### Frontend Processing:

1. **HttpClient** receives response
2. **Interceptor** (optional) transforms data
3. **Component** stores in signal: `courses = signal([])`
4. **Template** renders with `@for (course of courses())`
5. **Browser** displays formatted cards

---

## 9. Component Import Dependency Graph

```
home.ts (Main Component)
├── imports: [
│   ├── HeroSection          → GET /api/hero
│   ├── Generations          → GET /api/lineage/generations
│   ├── Stats                → GET /api/stats/ticker
│   ├── FeaturedCourses      → GET /api/courses/featured
│   ├── Legacy               → GET /api/lineage/pillars
│   ├── Roles                → GET /api/roles
│   ├── Journey              → GET /api/journey-paths
│   ├── Immersive            → GET /api/app-features
│   ├── Consultation         → GET /api/consultations/tiers
│   ├── TrainedConsultants   → GET /api/consultants
│   ├── Stories              → GET /api/reviews/google
│   ├── Downloads            → GET /api/sacred-codex
│   └── Instagram            ├─ GET /api/social/youtube-videos
│                             └─ GET /api/social/instagram-reels
│
└── SSR Prerendering: All routes prerendered at build time
    (No dynamic param routes on home page, so no getPrerenderParams needed)
```

---

## 10. Implementation Phases & Timeline

### Phase 1: Basic API Setup (Week 1-2)
- [ ] Create Node.js/Express backend boilerplate
- [ ] Implement 13 main GET endpoints
- [ ] Add CORS & authentication middleware
- [ ] Use mock/hardcoded data (copy from frontend)
- [ ] Test each endpoint response

### Phase 2: Database Integration (Week 3-4)
- [ ] Design normalized database schema
- [ ] Create migration scripts
- [ ] Implement ORM (Prisma recommended)
- [ ] Seed initial data
- [ ] Add database indexes

### Phase 3: Caching & Performance (Week 5)
- [ ] Implement Redis cache layer
- [ ] Add HTTP cache headers
- [ ] Configure cache TTLs per endpoint
- [ ] Monitor cache hit rates

### Phase 4: External Integrations (Week 6-8)
- [ ] Google Places API for reviews
- [ ] YouTube API for video metadata
- [ ] Instagram Graph API for reels
- [ ] Image storage (S3/Azure Blob)

### Phase 5: Admin Panel (Week 9-10)
- [ ] Create admin dashboard
- [ ] Implement CRUD for content
- [ ] Add role-based access control
- [ ] Enable bulk operations

### Phase 6: Testing & Deployment (Week 11-12)
- [ ] Unit & integration tests
- [ ] Load testing
- [ ] Security audit
- [ ] Deploy to production

---

## 11. Environment Configuration

```env
# Backend
NODE_ENV=production
PORT=3000
DB_URL=postgresql://user:pass@host:5432/maharishi_kapi
REDIS_URL=redis://localhost:6379
CORS_ORIGIN=https://maharishikapi.com

# Third-party APIs
GOOGLE_PLACES_API_KEY=xxx
YOUTUBE_API_KEY=xxx
INSTAGRAM_BUSINESS_ACCOUNT_ID=xxx
INSTAGRAM_ACCESS_TOKEN=xxx

# Storage
AZURE_STORAGE_ACCOUNT=xxx
AZURE_STORAGE_KEY=xxx

# Analytics (optional)
SENTRY_DSN=xxx
DATADOG_API_KEY=xxx
```

---

## 12. Monitoring & Alerts

```
Key Metrics to Monitor:
├── API Response Times (p50, p95, p99)
├── Cache Hit Ratio (target: >80% for static, >60% for dynamic)
├── Database Query Performance
├── Error Rate (5XX responses)
├── Endpoint Availability
├── Data Freshness (for social media content)
└── Cost (API calls, storage, CDN)

Alerts:
├── Response time > 500ms
├── Cache hit ratio < 50%
├── Error rate > 1%
├── Database down
├── Disk space > 90%
├── SSL certificate expiring soon
└── Unusual API traffic patterns
```

---

## 13. Migration Checklist

When switching from hardcoded frontend data to live backend API:

```
[ ] 1. Backend API developed and tested
[ ] 2. All endpoints return same response format as current hardcoded data
[ ] 3. Frontend components updated to call API instead of local arrays
[ ] 4. Update home.ts to fetch data in constructor or ngOnInit
[ ] 5. Test SSR prerendering with API calls
[ ] 6. Verify build completes with "Prerendered N static routes"
[ ] 7. Performance testing (compare load times before/after)
[ ] 8. Staging environment validation
[ ] 9. Backup current hardcoded data
[ ] 10. Deploy backend to production
[ ] 11. Update frontend to point to production API
[ ] 12. Monitor error rates & performance
[ ] 13. Gradual rollout (canary, A/B test)
[ ] 14. Retire hardcoded data once confident
```

---

## 14. Questions for Backend Implementation Team

1. **Database Choice?** PostgreSQL (recommended) or MongoDB?
2. **ORM?** Prisma, TypeORM, or raw SQL?
3. **Caching?** Redis, in-memory, or HTTP caching only?
4. **Search?** ElasticSearch for courses/consultants filtering?
5. **Real-time Updates?** WebSockets for live review/student count?
6. **Image Storage?** S3, Azure Blob, or self-hosted?
7. **API Authentication?** JWT, OAuth, or API keys?
8. **Rate Limiting?** Per IP, per user, or per API key?
9. **Monitoring?** Sentry, Datadog, or custom logging?
10. **Deployment?** Docker, Kubernetes, or serverless (Lambda/Functions)?

---

## Summary

The Maharishi Kapi home page is a **data-driven, component-based architecture** with:
- **13 API endpoints** serving static and dynamic content
- **Normalized database** for scalable content management
- **Aggressive caching strategy** for performance
- **13 frontend components** cleanly separated by concern
- **Easy content updates** via admin panel (after implementation)

This specification provides everything needed to build and maintain the backend infrastructure supporting this website.

---

**Document Version:** 1.0  
**Last Updated:** 2026-09-18  
**Author:** Claude Haiku 4.5
