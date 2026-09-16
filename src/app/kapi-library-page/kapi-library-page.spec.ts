import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KapiLibraryPage } from './kapi-library-page';

describe('KapiLibraryPage', () => {
  let component: KapiLibraryPage;
  let fixture: ComponentFixture<KapiLibraryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KapiLibraryPage],
    }).compileComponents();

    fixture = TestBed.createComponent(KapiLibraryPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
