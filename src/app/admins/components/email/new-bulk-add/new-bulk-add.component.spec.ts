import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBulkAddComponent } from './new-bulk-add.component';

describe('NewBulkAddComponent', () => {
  let component: NewBulkAddComponent;
  let fixture: ComponentFixture<NewBulkAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewBulkAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewBulkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
