import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedHotelsComponent } from './related-hotels.component';

describe('RelatedHotelsComponent', () => {
  let component: RelatedHotelsComponent;
  let fixture: ComponentFixture<RelatedHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatedHotelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatedHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
