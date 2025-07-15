import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsDisplayComponent } from './hotels-display.component';

describe('HotelsDisplayComponent', () => {
  let component: HotelsDisplayComponent;
  let fixture: ComponentFixture<HotelsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelsDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
