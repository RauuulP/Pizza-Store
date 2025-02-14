import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaService } from '../services/pizza.service';
import { CartPizza, Pizza } from '../pizza.model';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  pizzas: WritableSignal<Pizza[]> = signal<Pizza[]>([]);
  selectedPizzaId: WritableSignal<string | null> = signal<string | null>(null);
  selectedPizza: WritableSignal<Pizza | null> = signal<Pizza | null>(null);
  pizzaSize = signal<'S' | 'M' | 'L'>('M');
  cart: WritableSignal<(Pizza & { size: 'S' | 'M' | 'L'; price: number })[]> =
    signal([]);
  total = signal<number>(0);
  successMessage = signal<string | null>(null);

  constructor(
    private pizzaService: PizzaService,
    public cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.fetchPizzas();
    this.fetchPizzaOfTheDay();
  }

  fetchPizzas() {
    this.pizzaService.getPizzas().subscribe({
      next: (pizzas) => {
        this.pizzas.set(pizzas);
      },
      error: (err) => {
        console.error('Error fetching pizzas:', err);
      },
    });
  }

  fetchPizzaOfTheDay() {
    this.pizzaService.loadPizzaOfTheDay().subscribe({
      next: (pizza) => {
        this.selectedPizza.set(pizza);
        this.selectedPizzaId.set(pizza.id);
      },
      error: (err) => {
        console.error('Error fetching pizza of the day:', err);
        this.selectedPizza.set(null);
      },
    });
  }

  onPizzaChange(selectedPizzaId: string) {
    const selectedPizza = this.pizzas().find(
      (pizza) => pizza.id === selectedPizzaId
    );
    this.selectedPizza.set(selectedPizza || null);
  }

  addToCart() {
    const selectedPizza = this.selectedPizza();
    if (selectedPizza) {
      const size = this.pizzaSize();
      const price = selectedPizza.sizes[size];
      const cartPizza: CartPizza = {
        ...selectedPizza,
        size,
        price,
      };
      this.cartService.addToCart(cartPizza);
    }
  }

  deleteItem(pizzaId: string, index: number) {
    this.cartService.deletePizza(pizzaId, index);
  }

  checkout() {
    this.orderService.placeOrder();
    this.successMessage.set('Success');
    setTimeout(() => {
      this.successMessage.set(null);
    }, 3000);
  }
}
