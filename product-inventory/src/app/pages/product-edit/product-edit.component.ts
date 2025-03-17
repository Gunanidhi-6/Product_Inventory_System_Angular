import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `

    <div class="container mt-4">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Product Inventory Management System</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" routerLink="/products">Products</a></li>
            <ng-template #loginMessage>
                <span class="nav-link text-muted" style="cursor: not-allowed;" title="Please login to access products">Products</span>
              </ng-template>
            <li class="nav-item"><a class="nav-link" routerLink="/about">About</a></li>
          </ul>
        </div>
      </nav>

    <div class="container mt-5">
      <h2 class="text-center">Edit Product</h2>
      <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="p-4 border rounded shadow-sm bg-light">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input type="text" class="form-control" formControlName="name" aria-label="Product Name">
          <div class="text-danger" *ngIf="productForm.controls['name'].invalid && productForm.controls['name'].touched">
            Name is required.
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Manufacturer</label>
          <input type="text" class="form-control" formControlName="manufacturer" aria-label="Manufacturer">
        </div>
        <div class="mb-3">
          <label class="form-label">Price</label>
          <input type="number" class="form-control" formControlName="price" aria-label="Price">
          <div class="text-danger" *ngIf="productForm.controls['price'].invalid && productForm.controls['price'].touched">
            Price is required and must be a positive number.
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Quantity</label>
          <input type="number" class="form-control" formControlName="quantity" aria-label="Quantity">
          <div class="text-danger" *ngIf="productForm.controls['quantity'].invalid && productForm.controls['quantity'].touched">
            Quantity must be at least 1.
          </div>
        </div>
        <button type="submit" class="btn btn-warning w-100" [disabled]="productForm.invalid">Update Product</button>
      </form>
      <footer class="text-center mt-5 py-3 bg-light">
        © 2025 Products Inventory
      </footer>
    </div>
  `,
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  productId: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      manufacturer: [''],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get(`http://localhost:3000/products/${this.productId}`).subscribe((data: any) => {
      this.productForm.patchValue(data);
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.http.put(`http://localhost:3000/products/${this.productId}`, this.productForm.value).subscribe(() => {
        alert('Product updated successfully!');
        this.router.navigate(['/products']);
      });
    }
  }
}
