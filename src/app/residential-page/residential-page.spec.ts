import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResidentialPage } from './residential-page';

describe('ResidentialPage', () => {
  let component: ResidentialPage;
  let fixture: ComponentFixture<ResidentialPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentialPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ResidentialPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
