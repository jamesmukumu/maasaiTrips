import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBulkComponent } from './delete-bulk.component';

describe('DeleteBulkComponent', () => {
  let component: DeleteBulkComponent;
  let fixture: ComponentFixture<DeleteBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBulkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
