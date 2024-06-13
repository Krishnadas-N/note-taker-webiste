import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GoogleCredentials } from '../models/googleAuth.Model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService  {
  private apiUrl = 'http://localhost:3000/auth';
  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
    loginWithGoogle(credentials:GoogleCredentials):Observable<any> {
      console.log("Crendiatals form gogole",credentials)
      return this.http.post(`${this.apiUrl}/verify-token`, credentials);
    }
}
