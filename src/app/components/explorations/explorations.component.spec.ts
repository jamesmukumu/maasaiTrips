import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorationsComponent } from './explorations.component';

describe('ExplorationsComponent', () => {
  let component: ExplorationsComponent;
  let fixture: ComponentFixture<ExplorationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExplorationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExplorationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
