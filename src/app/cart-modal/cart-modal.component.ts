import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css',
})
export class CartModalComponent {
  constructor(
    public cartService: CartService,
    private dialogRef: MatDialogRef<CartModalComponent>
  ) {}

  get cartItems() {
    return this.cartService.getCartItems()();
  }

  get cartTotal() {
    return this.cartService.getTotal();
  }

  checkout() {
    alert('Checkout complete!');
    this.cartService.clearCart();
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

  deleteItem(pizzaId: string, index: number){
    this.cartService.deletePizza(pizzaId, index)
  }
}
