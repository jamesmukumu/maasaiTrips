import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAlertNewsLettersComponent } from './update-alert-news-letters.component';

describe('UpdateAlertNewsLettersComponent', () => {
  let component: UpdateAlertNewsLettersComponent;
  let fixture: ComponentFixture<UpdateAlertNewsLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAlertNewsLettersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAlertNewsLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
