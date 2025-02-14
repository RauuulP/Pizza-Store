import { Pizza } from './pizza.model';
import { CartPizza } from './pizza.model';

export interface Order {
  id: string;
  // items: (Pizza & { size: 'S' | 'M' | 'L'; price: number })[];
  items: CartPizza[]
  total: number;
  date: Date;
}
