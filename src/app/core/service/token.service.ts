import { Injectable } from '@angular/core';
const KEY = 'authToken';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  setToken(token: string): void {
    localStorage.setItem(KEY, token);
  }

  getToken(): any {
    return localStorage.getItem(KEY);
  }

  removeToken(): void {
    localStorage.removeItem(KEY);
  }
}
