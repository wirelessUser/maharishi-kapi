import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundraiserPage } from './fundraiser-page';

describe('FundraiserPage', () => {
  let component: FundraiserPage;
  let fixture: ComponentFixture<FundraiserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundraiserPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FundraiserPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
