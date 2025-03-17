import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Product Inventory Management System</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" routerLink="/products">Products</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/about">About</a></li>
          </ul>
        </div>
      </nav>

      <h2 class="text-center mt-4">About This Application</h2>
      <p class="text-center mt-3">
        This is a <b>Product Inventory Management system</b> built with Angular 19.
        It allows users to manage products with authentication and CRUD operations.
      </p>

      <footer class="text-center mt-5 py-3 bg-light">
        © 2025 Products Inventory
      </footer>
    </div>
  `,
})
export class AboutComponent {}
