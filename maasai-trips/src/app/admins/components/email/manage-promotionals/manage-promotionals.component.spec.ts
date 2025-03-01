import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePromotionalsComponent } from './manage-promotionals.component';

describe('ManagePromotionalsComponent', () => {
  let component: ManagePromotionalsComponent;
  let fixture: ComponentFixture<ManagePromotionalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePromotionalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagePromotionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
