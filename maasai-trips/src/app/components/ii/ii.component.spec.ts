import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IiComponent } from './ii.component';

describe('IiComponent', () => {
  let component: IiComponent;
  let fixture: ComponentFixture<IiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
