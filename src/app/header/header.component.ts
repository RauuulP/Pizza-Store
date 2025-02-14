import { Component, signal, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    public cartService: CartService,
    private dialog: MatDialog
  ) {}

  goHome() {
    this.router.navigate(['/']);
  }

  get cartItemCount() {
    return this.cartService.getCartItemCount();
  }

  get cartTotal() {
    return this.cartService.getTotal();
  }

  viewCart() {
    this.dialog.open(CartModalComponent, {
    })
  }
}
