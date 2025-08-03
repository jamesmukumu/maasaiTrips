import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageOnboardingComponent } from './package-onboarding.component';

describe('PackageOnboardingComponent', () => {
  let component: PackageOnboardingComponent;
  let fixture: ComponentFixture<PackageOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackageOnboardingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackageOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
