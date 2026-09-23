import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorAvatar } from './author-avatar';

describe('AuthorAvatar', () => {
  function render(name: string, photo?: string | null): ComponentFixture<AuthorAvatar> {
    const fixture = TestBed.createComponent(AuthorAvatar);
    fixture.componentRef.setInput('name', name);
    fixture.componentRef.setInput('photo', photo);
    fixture.detectChanges();
    return fixture;
  }

  const image = (fixture: ComponentFixture<AuthorAvatar>) =>
    fixture.nativeElement.querySelector('img') as HTMLImageElement | null;

  it('shows the photo when the author has one', () => {
    const fixture = render('Acharya Alok', 'https://cdn.test/alok.jpg');

    expect(image(fixture)?.getAttribute('src')).toBe('https://cdn.test/alok.jpg');
    expect(image(fixture)?.alt).toBe('Acharya Alok');
  });

  it.each([null, undefined, '', '   '])('shows initials instead of a broken image when the photo is %j', (photo) => {
    const fixture = render('Acharya Alok', photo);

    expect(image(fixture)).toBeNull();
    expect(fixture.nativeElement.textContent.trim()).toBe('AA');
    expect(fixture.nativeElement.querySelector('[role="img"]').getAttribute('aria-label')).toBe('Acharya Alok');
  });

  it('falls back to initials when the photo fails to load', () => {
    const fixture = render('Riitu Dua', 'https://cdn.test/missing.jpg');

    image(fixture)!.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(image(fixture)).toBeNull();
    expect(fixture.nativeElement.textContent.trim()).toBe('RD');
  });

  it('tries the next photo after an earlier one failed', () => {
    const fixture = render('Riitu Dua', 'https://cdn.test/missing.jpg');
    image(fixture)!.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    fixture.componentRef.setInput('photo', 'https://cdn.test/other.jpg');
    fixture.detectChanges();

    expect(image(fixture)?.getAttribute('src')).toBe('https://cdn.test/other.jpg');
  });

  it('uses a single letter for a one-word name', () => {
    expect(render('Shobha', null).nativeElement.textContent.trim()).toBe('S');
  });
});
