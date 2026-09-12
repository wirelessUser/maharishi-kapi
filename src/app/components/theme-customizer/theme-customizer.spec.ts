import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeCustomizerComponent } from './theme-customizer';

describe('ThemeCustomizer', () => {
  let component: ThemeCustomizerComponent;
  let fixture: ComponentFixture<ThemeCustomizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeCustomizerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeCustomizerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
