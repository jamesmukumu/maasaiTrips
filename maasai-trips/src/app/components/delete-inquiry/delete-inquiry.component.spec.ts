import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInquiryComponent } from './delete-inquiry.component';

describe('DeleteInquiryComponent', () => {
  let component: DeleteInquiryComponent;
  let fixture: ComponentFixture<DeleteInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteInquiryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
