import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
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
            <li class="nav-item"><a class="nav-link" routerLink="/sign-in">Sign In</a></li>
          </ul>
        </div>
      </nav>

    <div class="container mt-5">
      <h2 class="text-center">Register</h2>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="p-4 border rounded shadow-sm bg-light">
        <div class="mb-3">
          <label class="form-label">First Name</label>
          <input type="text" class="form-control" formControlName="firstName">
          <div class="text-danger" *ngIf="registerForm.controls['firstName'].invalid && registerForm.controls['firstName'].touched">
            First Name is required.
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Last Name</label>
          <input type="text" class="form-control" formControlName="lastName">
          <div class="text-danger" *ngIf="registerForm.controls['lastName'].invalid && registerForm.controls['lastName'].touched">
            Last Name is required.
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" formControlName="email">
          <div class="text-danger" *ngIf="registerForm.controls['email'].invalid && registerForm.controls['email'].touched">
            Valid email is required.
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" formControlName="password">
          <div class="text-danger" *ngIf="registerForm.controls['password'].invalid && registerForm.controls['password'].touched">
            Password is required.
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Location</label>
          <input type="text" class="form-control" formControlName="location">
          <div class="text-danger" *ngIf="registerForm.controls['location'].invalid && registerForm.controls['location'].touched">
            Location is required.
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Mobile Number</label>
          <input type="text" class="form-control" formControlName="mobile">
          <div class="text-danger" *ngIf="registerForm.controls['mobile'].invalid && registerForm.controls['mobile'].touched">
            Mobile Number is required.
          </div>
        </div>
        <button type="submit" class="btn btn-primary w-100" [disabled]="registerForm.invalid">Register</button>
      </form>
      <footer class="text-center mt-5 py-3 bg-light">
        © 2025 Products Inventory
      </footer>
    </div>
  `,
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      location: ['', Validators.required],
      mobile: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:3000/users', this.registerForm.value).subscribe(() => {
        alert('Registration successful! Please sign in.');
        this.router.navigate(['/sign-in']);
      });
    }
  }
}
