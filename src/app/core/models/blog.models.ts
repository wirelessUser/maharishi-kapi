export interface ArticleDto {
  id: string;
  slug: string;
  title: string;
  deck: string;
  category: string;
  image: string;
  author: string;
  authorPhoto: string;
  date: string;
  readTime: string;
  featured: boolean;
  pullQuote?: string | null;
  issueVol?: string | null;
}

export interface ArticleDetailDto {
  id: string;
  slug: string;
  title: string;
  deck: string;
  category: string;
  image: string;
  content: string;
  author: string;
  authorPhoto: string;
  publishedDate: string;
  readTimeMinutes: number;
  featured: boolean;
  pullQuote?: string | null;
  issueVolume?: string | null;
  viewCount: number;
}

export interface AuthorDto {
  id: string;
  name: string;
  bio?: string | null;
  photo?: string | null;
}

// Slug and author are fixed once an article is created, so the update payload omits them.
export interface UpdateArticleDto {
  title: string;
  deck: string;
  category: string;
  image: string;
  content: string;
  publishedDate: string;
  readTimeMinutes: number;
  isFeatured: boolean;
  pullQuote: string | null;
  issueVolume: string | null;
}

export interface CreateArticleDto extends UpdateArticleDto {
  slug: string;
  authorId: string;
}

export interface PaginationMetadata {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Paged endpoints return `items` + `pagination`, not the `data` envelope of ApiResponse<T>.
export interface PagedResponse<T> {
  status: string;
  items: T[];
  pagination: PaginationMetadata | null;
  message?: string;
}

export type ArticleSort = 'newest' | 'oldest' | 'popular' | 'trending';

export interface ArticleQuery {
  page?: number;
  pageSize?: number;
  category?: string;
  sortBy?: ArticleSort;
}

export interface NewsletterSubscribeDto {
  email: string;
}
