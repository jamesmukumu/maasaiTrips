import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkMailsComponent } from './bulk-mails.component';

describe('BulkMailsComponent', () => {
  let component: BulkMailsComponent;
  let fixture: ComponentFixture<BulkMailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BulkMailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BulkMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
