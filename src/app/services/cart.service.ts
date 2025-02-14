import { Injectable, WritableSignal, signal } from '@angular/core';
import { Pizza } from '../pizza.model';
import { CartPizza } from '../pizza.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: WritableSignal<CartPizza[]> = signal([]);
  private cartItemCount: WritableSignal<number> = signal(0);

  constructor() {}

  getCartItems() {
    return this.cartItems;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  getTotal() {
    return this.cartItems().reduce((total, item) => total + item.price, 0);
  }

  addToCart(pizza: CartPizza) {
    const updatedCartItems = [...this.cartItems(), pizza];
    this.cartItems.set(updatedCartItems);
    this.cartItemCount.set(updatedCartItems.length);
    console.log('This is your cart', updatedCartItems)
  }

  clearCart() {
    this.cartItems.set([]);
    this.cartItemCount.set(0);
  }

  deletePizza(pizzaId: string, index: number) {
    const updatedCartItems = [...this.cartItems()];

    if (updatedCartItems[index].id === pizzaId) {
      updatedCartItems.splice(index, 1);
    }
    this.cartItems.set(updatedCartItems);
    this.cartItemCount.set(updatedCartItems.length);
  }
}
