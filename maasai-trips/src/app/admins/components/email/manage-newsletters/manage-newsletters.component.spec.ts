import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNewslettersComponent } from './manage-newsletters.component';

describe('ManageNewslettersComponent', () => {
  let component: ManageNewslettersComponent;
  let fixture: ComponentFixture<ManageNewslettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageNewslettersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageNewslettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
