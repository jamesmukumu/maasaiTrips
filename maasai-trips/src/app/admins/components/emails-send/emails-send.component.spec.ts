import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsSendComponent } from './emails-send.component';

describe('EmailsSendComponent', () => {
  let component: EmailsSendComponent;
  let fixture: ComponentFixture<EmailsSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailsSendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailsSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
