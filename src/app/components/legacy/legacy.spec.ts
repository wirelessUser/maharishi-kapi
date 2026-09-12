import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Legacy } from './legacy';

describe('Legacy', () => {
  let component: Legacy;
  let fixture: ComponentFixture<Legacy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Legacy],
    }).compileComponents();

    fixture = TestBed.createComponent(Legacy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
