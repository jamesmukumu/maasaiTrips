import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationViewComponent } from './destination-view.component';

describe('DestinationViewComponent', () => {
  let component: DestinationViewComponent;
  let fixture: ComponentFixture<DestinationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestinationViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DestinationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
