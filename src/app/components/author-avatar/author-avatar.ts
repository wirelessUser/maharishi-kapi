import { Component, computed, input, linkedSignal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-author-avatar',
  host: {
    class: 'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-kapi-peach text-kapi-saffronDark',
  },
  template: `
    @if (showPhoto()) {
      <img [src]="photo()" [alt]="name()" (error)="failed.set(true)" class="h-full w-full object-cover" />
    } @else {
      <span role="img" [attr.aria-label]="name()" class="text-[11px] font-bold leading-none tracking-wide">{{ initials() }}</span>
    }
  `,
})
export class AuthorAvatar {
  readonly name = input.required<string>();
  readonly photo = input<string | null | undefined>();

  // Resets whenever a different photo is supplied, so one bad image can't hide the next article's photo.
  protected readonly failed = linkedSignal({ source: this.photo, computation: () => false });

  protected readonly showPhoto = computed(() => !!this.photo()?.trim() && !this.failed());

  protected readonly initials = computed(() => {
    const words = this.name().trim().split(/\s+/).filter(Boolean);
    if (!words.length) {
      return '?';
    }
    const first = words[0][0];
    const last = words.length > 1 ? words[words.length - 1][0] : '';
    return (first + last).toUpperCase();
  });
}
