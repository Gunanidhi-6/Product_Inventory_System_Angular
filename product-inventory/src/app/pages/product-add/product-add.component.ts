import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-5">
      <h2 class="text-center">Add Product</h2>
      <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="p-4 border rounded shadow-sm bg-light">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input type="text" class="form-control" formControlName="name">
          <div class="text-danger" *ngIf="productForm.controls['name'].invalid && productForm.controls['name'].touched">
            Name is required.
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Manufacturer</label>
          <input type="text" class="form-control" formControlName="manufacturer">
        </div>
        <div class="mb-3">
          <label class="form-label">Price</label>
          <input type="number" class="form-control" formControlName="price">
        </div>
        <div class="mb-3">
          <label class="form-label">Quantity</label>
          <input type="number" class="form-control" formControlName="quantity">
        </div>
        <button type="submit" class="btn btn-primary w-100" [disabled]="productForm.invalid">Add Product</button>
      </form>
    </div>
  `,
})
export class ProductAddComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      manufacturer: [''],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.http.post('http://localhost:3000/products', this.productForm.value).subscribe(() => {
        alert('Product added successfully!');
        this.router.navigate(['/products']);
      });
    }
  }
}
