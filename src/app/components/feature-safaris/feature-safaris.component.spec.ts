import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureSafarisComponent } from './feature-safaris.component';

describe('FeatureSafarisComponent', () => {
  let component: FeatureSafarisComponent;
  let fixture: ComponentFixture<FeatureSafarisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureSafarisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeatureSafarisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
