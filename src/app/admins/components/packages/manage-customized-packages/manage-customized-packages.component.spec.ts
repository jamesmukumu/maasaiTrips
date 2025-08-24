import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCustomizedPackagesComponent } from './manage-customized-packages.component';

describe('ManageCustomizedPackagesComponent', () => {
  let component: ManageCustomizedPackagesComponent;
  let fixture: ComponentFixture<ManageCustomizedPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageCustomizedPackagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageCustomizedPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
