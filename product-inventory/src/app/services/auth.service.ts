import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; 
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}
  
  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', user.email);
          return true;
        } else {
          return false;
        }
      })
    );
  }
  
  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
  }
  
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

}
