import { Injectable, signal, WritableSignal } from '@angular/core';
import { Order } from '../order.model';
import { CartService } from './cart.service';
import { CartPizza } from '../pizza.model';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError } from 'rxjs';
import { PizzaService } from './pizza.service';
import { Pizza } from '../pizza.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: WritableSignal<Order[]> = signal<Order[]>([]);

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private pizzaService: PizzaService
  ) {}

  placeOrder() {
    const cartItems: CartPizza[] = this.cartService.getCartItems()();
    if (cartItems.length === 0) {
      console.warn("You can't place an empty order.");
      return;
    }

    const total = this.cartService.getTotal();
    const orderData = cartItems.map((item) => ({
      pizzaId: item.id,
      size: item.size,
      price: item.price,
    }));

    this.http
      .post('http://localhost:5000/submit-order', orderData)
      .pipe(
        catchError((error) => {
          console.error('Error placing order:', error);
          return of({ message: 'Order submission failed' });
        })
      )
      .subscribe((response: any) => {
        console.log('This is the response', response);

        if (response.message.includes('Order placed successfully')) {
          console.log('Order placed successfully:', response.order);

          const newOrder: Order = {
            id: response.order.id,
            items: cartItems,
            total,
            date: new Date(),
          };

          this.orders.set([...this.orders(), newOrder]);
          this.cartService.clearCart();
        } else {
          console.warn('Order placement failed miserably:', response.message);
        }
      });
  }

  getPastOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:5000/orders');
  }

  // getFullOrderDetails(order: Order): Observable<Order> {
  //   const pizzaRequests = order.items.map((item) =>
  //     this.pizzaService.getPizzaById(item.id).pipe(
  //       map((pizza) => ({
  //         ...item,
  //         name: pizza.name,
  //         image: pizza.image,
  //       }))
  //     )
  //   );

  //   return forkJoin(pizzaRequests).pipe(
  //     map((fullItems) => ({
  //       ...order,
  //       items: fullItems,
  //     }))
  //   );
  // }
}
