import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse, LoginRequest } from 'core/models/auth.model';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private url = environment.API_URL;

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.url + '/users/login', credentials);
  }

  getAuthToken() {
    return localStorage.getItem('token-user') || '';
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    if (!token) return false;

    const tokenData = this.decodeToken(token);
    if (this.isTokenExpired(tokenData)) {
      this.logout();
      return false;
    }
    return true;
  }

  private decodeToken(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  }

  private isTokenExpired(tokenData: any): boolean {
    if (!tokenData || !tokenData.exp) return true;
    const expiry = tokenData.exp * 1000;
    return expiry < Date.now();
  }

  logout(){
    return localStorage.removeItem('token-user');
  }
}
