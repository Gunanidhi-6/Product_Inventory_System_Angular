import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `

    <div class="container mt-4">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Product Inventory Management System</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" routerLink="/products">Products</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/about">About</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/">Logout</a></li>
            <!--li class="nav-item"><a class="nav-link" routerLink="/sign-in">Login</a></li-->
            <li class="nav-item"><a class="nav-link" routerLink="/register">Register</a></li>
          </ul>
        </div>
      </nav>

    <div class="container mt-5">
      <h2 class="text-center">Product List</h2>
      <input type="text" class="form-control mb-3" placeholder="Search products..." [(ngModel)]="searchTerm">

      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let product of filteredProducts()">
            <td>{{ product.name }}</td>
            <td>{{ product.manufacturer }}</td>
            <td>\${{ product.price }}</td>
            <td>
              <button class="btn btn-info btn-sm me-2" (click)="viewProduct(product.id)">View</button>
              <button class="btn btn-warning btn-sm me-2" (click)="editProduct(product.id)">Edit</button>
              <button class="btn btn-danger btn-sm" (click)="deleteProduct(product.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-success" (click)="addProduct()">Add Product</button>
      <footer class="text-center mt-5 py-3 bg-light">
        © 2025 Products Inventory
      </footer>
    </div>
  `,
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<any[]>('http://localhost:3000/products').subscribe(data => {
      this.products = data;
    });
  }

  filteredProducts() {
    return this.products.filter(product => 
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  viewProduct(productId: number) {
    const isLoggedIn = localStorage.getItem('token') !== null; 
      this.router.navigate(['/products/view', productId]); 
  }

  editProduct(id: number) {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.http.delete(`http://localhost:3000/products/${id}`).subscribe(() => {
        alert('Product deleted successfully!');
        this.fetchProducts();
      });
    }
  }

  addProduct() {
    this.router.navigate(['/products/add']);
  }
}
