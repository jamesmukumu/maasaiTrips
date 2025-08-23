import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePackageCategoryComponent } from './manage-package-category.component';

describe('ManagePackageCategoryComponent', () => {
  let component: ManagePackageCategoryComponent;
  let fixture: ComponentFixture<ManagePackageCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePackageCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagePackageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
