import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Pizza } from '../pizza.model';
import { PizzaService } from '../services/pizza.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-of-the-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pizza-of-the-day.component.html',
  styleUrl: './pizza-of-the-day.component.css',
})
export class PizzaOfTheDayComponent implements OnInit {

  pizzaOfTheDay: WritableSignal<Pizza | null> = signal<Pizza | null>(null);
  pizzaLoading: WritableSignal<boolean> = signal<boolean>(true);

  constructor(private pizzaService: PizzaService) {}

  ngOnInit() {
    this.loadPizzaOfTheDay();
  }

  loadPizzaOfTheDay() {
    this.pizzaService.loadPizzaOfTheDay().subscribe({
      next: (pizza) => {
        this.pizzaOfTheDay.set(pizza);
        this.pizzaLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching pizza of the day:', err);
        this.pizzaOfTheDay.set(null);
        this.pizzaLoading.set(false);
      },
    });
  }
}
