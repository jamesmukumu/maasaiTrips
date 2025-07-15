import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNewsComponent } from './alert-news.component';

describe('AlertNewsComponent', () => {
  let component: AlertNewsComponent;
  let fixture: ComponentFixture<AlertNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
