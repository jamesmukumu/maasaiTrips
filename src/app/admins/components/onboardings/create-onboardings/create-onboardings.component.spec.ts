import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOnboardingsComponent } from './create-onboardings.component';

describe('CreateOnboardingsComponent', () => {
  let component: CreateOnboardingsComponent;
  let fixture: ComponentFixture<CreateOnboardingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOnboardingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOnboardingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
