import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaOfTheDayComponent } from './pizza-of-the-day.component';

describe('PizzaOfTheDayComponent', () => {
  let component: PizzaOfTheDayComponent;
  let fixture: ComponentFixture<PizzaOfTheDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaOfTheDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
