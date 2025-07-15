import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafarisComponent } from './safaris.component';

describe('SafarisComponent', () => {
  let component: SafarisComponent;
  let fixture: ComponentFixture<SafarisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SafarisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SafarisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
