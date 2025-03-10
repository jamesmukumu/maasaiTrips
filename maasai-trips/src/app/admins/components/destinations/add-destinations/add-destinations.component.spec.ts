import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDestinationsComponent } from './add-destinations.component';

describe('AddDestinationsComponent', () => {
  let component: AddDestinationsComponent;
  let fixture: ComponentFixture<AddDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDestinationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
