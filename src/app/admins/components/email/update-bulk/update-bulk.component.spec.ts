import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBulkComponent } from './update-bulk.component';

describe('UpdateBulkComponent', () => {
  let component: UpdateBulkComponent;
  let fixture: ComponentFixture<UpdateBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBulkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
