import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentQuestComponent } from './frequent-quest.component';

describe('FrequentQuestComponent', () => {
  let component: FrequentQuestComponent;
  let fixture: ComponentFixture<FrequentQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrequentQuestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrequentQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
