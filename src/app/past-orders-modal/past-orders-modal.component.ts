import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../order.model';

@Component({
  selector: 'app-past-orders-modal',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './past-orders-modal.component.html',
  styleUrl: './past-orders-modal.component.css',
})
export class PastOrdersModalComponent {
  order: Order;

  constructor(
    private dialogRef: MatDialogRef<PastOrdersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order: Order }
  ) {
    this.order = data.order;
    // console.log(this.order);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
