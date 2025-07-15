import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPackagesComponent } from './related-packages.component';

describe('RelatedPackagesComponent', () => {
  let component: RelatedPackagesComponent;
  let fixture: ComponentFixture<RelatedPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatedPackagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatedPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
