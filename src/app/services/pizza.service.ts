import { Injectable } from '@angular/core';
import { Pizza } from '../pizza.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  private apiUrl = 'http://localhost:5000/pizzas';
  private pizzaOfTheDayUrl = 'http://localhost:5000';


  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiUrl).pipe(
      map((pizzas) => pizzas.map(this.loadPizza))
    );
  }

  getPizzaById(id: string): Observable<Pizza> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Pizza>(url).pipe(map(this.loadPizza));
  }

  getPizzaOfTheDay(): Observable<Pizza> {
    const today = new Date().toISOString().split('T')[0];
    const storedPizza = localStorage.getItem('pizzaOfTheDay');
    const storedDay = localStorage.getItem('pizzaOfTheDayDate');

    if (storedPizza && storedDay === today) {
      return of(JSON.parse(storedPizza));
    } else {
      return this.http.get<Pizza>(`${this.pizzaOfTheDayUrl}/pizza-of-the-day`).pipe(
        map((pizza) => {
          localStorage.setItem('pizzaOfTheDay', JSON.stringify(pizza));
          localStorage.setItem('pizzaOfTheDayDate', today);
          return this.loadPizza(pizza);
        })
      );
    }
  }

  loadPizza(pizza: Pizza): Pizza {
    const imagePath = pizza.image
      .replace('/public', '')
      .replace(/^\/+/, '');
    return {
      ...pizza,
      // image: `assets/${imagePath}`,
      image: `${imagePath}`,

    };
  }

  loadPizzaOfTheDay(): Observable<Pizza> {
    return this.getPizzaOfTheDay().pipe(
      map((pizza) => this.loadPizza(pizza)) 
    );
  }
}
