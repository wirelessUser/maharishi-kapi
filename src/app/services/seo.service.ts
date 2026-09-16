import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string;
}

export const SITE_NAME = 'Maharishi Kapi Institute';
export const SITE_URL = 'https://maharishikapi.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/mk-logo.png`;

/**
 * Central SEO controller. Every page component should call setPageSeo()
 * (and setJsonLd() where a schema.org type applies) in its constructor —
 * this is a prerendered SSR app, so whatever this sets is baked into the
 * static HTML search engines actually crawl.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private readonly titleService: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  setPageSeo(data: SeoData): void {
    const fullTitle = data.title.includes(SITE_NAME) ? data.title : `${data.title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${data.path}`;
    const image = data.image ?? DEFAULT_OG_IMAGE;

    this.titleService.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: data.description });
    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: data.type ?? 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /** Injects the page-level JSON-LD structured data block(s), replacing any previous one. */
  setJsonLd(schema: object | object[]): void {
    const id = 'page-json-ld';
    let script = this.document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }
}
