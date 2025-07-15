import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularPackageComponent } from './singular-package.component';

describe('SingularPackageComponent', () => {
  let component: SingularPackageComponent;
  let fixture: ComponentFixture<SingularPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularPackageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingularPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
