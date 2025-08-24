import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomizedIteneraryComponent } from './create-customized-itenerary.component';

describe('CreateCustomizedIteneraryComponent', () => {
  let component: CreateCustomizedIteneraryComponent;
  let fixture: ComponentFixture<CreateCustomizedIteneraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCustomizedIteneraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCustomizedIteneraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
