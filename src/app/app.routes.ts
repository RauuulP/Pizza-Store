import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ContactComponent } from './contact/contact.component';
import { PastOrdersComponent } from './past-orders/past-orders.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'order', component: OrderComponent },
  { path: 'past', component: PastOrdersComponent },
  { path: 'contact', component: ContactComponent },
];
