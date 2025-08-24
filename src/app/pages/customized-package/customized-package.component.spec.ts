import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedPackageComponent } from './customized-package.component';

describe('CustomizedPackageComponent', () => {
  let component: CustomizedPackageComponent;
  let fixture: ComponentFixture<CustomizedPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomizedPackageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomizedPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
