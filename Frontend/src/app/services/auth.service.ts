import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponseData, GoogleCredentials } from '../models/googleAuth.Model';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../models/responseHandler';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';

@Injectable()
export class AuthService  {
  private apiUrl = `${environment.backendUrl}/auth`
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService,private tokenService:TokenService) { }

  public isAuthenticated(): boolean {
    const token = this.tokenService.getAccessToken()
    return !this.jwtHelper.isTokenExpired(token);
  }
   loginWithGoogle(credentials:GoogleCredentials):Observable<ApiResponse<AuthResponseData>>{
      console.log("Crendiatals form gogole",credentials)
      return this.http.post<ApiResponse<AuthResponseData>>(`${this.apiUrl}/verify-token`, credentials).pipe(
        tap(response => {
        if(response.success){
          const accessToken = response.data.token;
          const refreshToken = response.data.refreshToken;
          this.tokenService.setTokens(accessToken,refreshToken)
       }})
      );
  }

    getRefreshToken(refreshToken:string):Observable<ApiResponse<AuthResponseData>>{
       return this.http.post<ApiResponse<AuthResponseData>>(`${this.apiUrl}/verify-token`, {refreshToken});
    }

   logout(){
    this.tokenService.clearTokens()
   }
}
