import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService  {
  private apiUrl = 'http://localhost:3000/auth';
  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public loginWithGoogle(): void {
    window.location.href = `${this.apiUrl}/google`;
  }
  public handleAuthCallback(): void {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      localStorage.setItem('token', token);
      this.router.navigate(['/']);
    }
  }
  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
