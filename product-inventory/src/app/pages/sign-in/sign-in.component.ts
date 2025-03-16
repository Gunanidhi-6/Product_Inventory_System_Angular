import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
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
            <li class="nav-item"><a class="nav-link" routerLink="/register">Register</a></li>
          </ul>
        </div>
      </nav>
    
    <div class="container mt-5">
      <h2 class="text-center">Sign In</h2>

      
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" formControlName="email">
          <div class="text-danger" *ngIf="loginForm.controls['email'].invalid && loginForm.controls['email'].touched">
            Valid email is required.
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" formControlName="password">
          <div class="text-danger" *ngIf="loginForm.controls['password'].invalid && loginForm.controls['password'].touched">
            Password is required.
          </div>
        </div>
        <p *ngIf="errorMessage" class="text-danger">{{ errorMessage }}</p> 
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>

      <footer class="text-center mt-5 py-3 bg-light">
        © 2025 Products Inventory
      </footer>
    </div>
  `,
})
export class SignInComponent {
  loginForm: FormGroup;
  errorMessage = ''; 

  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe(isValidUser => {
        if (isValidUser) {
          console.log("Login Successful");
          this.router.navigate(['/products']);
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      });
    }
  }
}