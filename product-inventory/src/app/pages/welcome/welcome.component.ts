import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Product Inventory Management System</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a *ngIf="isLoggedIn; else loginMessage" class="nav-link" routerLink="/products">Products</a></li>
            <ng-template #loginMessage>
                <span class="nav-link text-muted" style="cursor: not-allowed;" title="Please login to access products">Products</span>
              </ng-template>
            <li class="nav-item"><a class="nav-link" routerLink="/about">About</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/sign-in">Sign In</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/register">Register</a></li>
          </ul>
        </div>
      </nav>

      <h2 class="text-center mt-4">Product List</h2>

      <div class="text-center">
        <button class="btn btn-primary mt-3" (click)="addProduct()">Add Product</button>
      </div>

      <footer class="text-center mt-5 py-3 bg-light">
        © 2025 Products Inventory
      </footer>
    </div>
  `,
})
export class WelcomeComponent {
  isLoggedIn: any;

  constructor(private router: Router) {}

  addProduct() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      this.router.navigate(['/add-product']); 
    } else {
      this.router.navigate(['/sign-in']); 
    }
  }
}