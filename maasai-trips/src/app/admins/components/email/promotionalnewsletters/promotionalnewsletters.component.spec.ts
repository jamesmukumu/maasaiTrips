import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalnewslettersComponent } from './promotionalnewsletters.component';

describe('PromotionalnewslettersComponent', () => {
  let component: PromotionalnewslettersComponent;
  let fixture: ComponentFixture<PromotionalnewslettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromotionalnewslettersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromotionalnewslettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
