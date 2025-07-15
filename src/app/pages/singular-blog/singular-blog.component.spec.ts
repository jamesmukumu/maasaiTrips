import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularBlogComponent } from './singular-blog.component';

describe('SingularBlogComponent', () => {
  let component: SingularBlogComponent;
  let fixture: ComponentFixture<SingularBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingularBlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingularBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
