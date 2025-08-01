import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePatnersComponent } from './feature-patners.component';

describe('FeaturePatnersComponent', () => {
  let component: FeaturePatnersComponent;
  let fixture: ComponentFixture<FeaturePatnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturePatnersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturePatnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
