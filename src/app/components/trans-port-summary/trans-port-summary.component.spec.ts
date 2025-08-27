import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransPortSummaryComponent } from './trans-port-summary.component';

describe('TransPortSummaryComponent', () => {
  let component: TransPortSummaryComponent;
  let fixture: ComponentFixture<TransPortSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransPortSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransPortSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
