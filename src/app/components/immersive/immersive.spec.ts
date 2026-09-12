import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Immersive } from './immersive';

describe('Immersive', () => {
  let component: Immersive;
  let fixture: ComponentFixture<Immersive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Immersive],
    }).compileComponents();

    fixture = TestBed.createComponent(Immersive);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
