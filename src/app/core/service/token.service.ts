import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const KEY = 'authToken';

@Injectable({
  providedIn: 'root',
})
export class TokenService {


  private isLoggedBS = new BehaviorSubject<boolean>(false);
  public isLogged$ = this.isLoggedBS.asObservable()

  updateIsLogged(value: boolean): void {
    this.isLoggedBS.next(value);
  }

  getIsLogged(): boolean{
    return this.isLoggedBS.value
  }

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
