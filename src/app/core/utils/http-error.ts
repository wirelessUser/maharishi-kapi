import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

// Makes it obvious whether the API was unreachable or answered with an error status.
export function describeHttpError(err: unknown): string {
  if (err instanceof HttpErrorResponse) {
    const url = err.url ?? environment.apiUrl;
    return err.status === 0
      ? `No response from ${url} — the API is not running, its HTTPS certificate is not trusted, or CORS blocked the request.`
      : `HTTP ${err.status} from ${url}`;
  }
  return 'Unexpected error.';
}

// Prefers the API's own message (ASP.NET validation errors, ProblemDetails title, or { message }).
export function apiErrorMessage(err: unknown): string {
  if (!(err instanceof HttpErrorResponse) || err.status === 0) {
    return describeHttpError(err);
  }
  const body = err.error;
  if (body?.errors && typeof body.errors === 'object') {
    const messages = Object.values(body.errors as Record<string, string[]>).flat();
    if (messages.length) {
      return messages.join(' ');
    }
  }
  return body?.title ?? body?.message ?? describeHttpError(err);
}
