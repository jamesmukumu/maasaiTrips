import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMailsComponent } from './manage-mails.component';

describe('ManageMailsComponent', () => {
  let component: ManageMailsComponent;
  let fixture: ComponentFixture<ManageMailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageMailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
