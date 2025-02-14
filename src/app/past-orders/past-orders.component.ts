import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { Order } from '../order.model';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderComponent } from '../order/order.component';
import { PastOrdersModalComponent } from '../past-orders-modal/past-orders-modal.component';

@Component({
  selector: 'app-past-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './past-orders.component.html',
  styleUrl: './past-orders.component.css',
})
export class PastOrdersComponent {
  pastOrders: Order[] = [];

  currentPage = 1;
  ordersPerPage = 10;

  constructor(private orderService: OrderService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getPastOrders();
  }

  getPastOrders(): void {
    this.orderService.getPastOrders().subscribe((orders) => {
      this.pastOrders = orders.reverse();
    });
  }

  vieworder(order: Order) {
    // console.log(order)
    this.dialog.open(PastOrdersModalComponent, {
      data: {order}
    })
  }

  get totalPages() {
    return Math.ceil(this.pastOrders.length / this.ordersPerPage);
  }

  get pagedOrders() {
    const start = (this.currentPage - 1) * this.ordersPerPage;
    return this.pastOrders.slice(start, start + this.ordersPerPage);
  }

  get previousPageAvailable() {
    return this.currentPage > 1;
  }

  get nextPageAvailable() {
    return this.currentPage < this.totalPages;
  }

  nextPage() {
    if (this.nextPageAvailable) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.previousPageAvailable) {
      this.currentPage--;
    }
  }
}
