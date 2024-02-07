import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { City } from '../models/Citys';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private urlBase = `${environment.api}`;

  // Interfaces
  private isLoggedBS = new BehaviorSubject<boolean>(false);

  public isLogged$ = this.isLoggedBS.asObservable();

  private baseUrl = `${environment.api}`;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
  ) {}

  // Interfaces
  public updateIsLogged(value: boolean): void {
    this.isLoggedBS.next(value);
  }

  public setToken(token: string): void {
    this.tokenService.setToken(token);
  }

  public async isLogged(): Promise<boolean>{
    if(this.isLoggedBS.value){
      return new Promise<boolean>(resolve => resolve(true));
    }
    const {token} = await firstValueFrom(this.httpClient.post<{token: boolean}>(`${this.baseUrl}/checkToken`, {token: this.tokenService.getToken()}), { defaultValue: {token: false} });
    this.updateIsLogged(token);

    return token
  }

  public citysAndState(): Observable<City[]>{
    return this.httpClient.get<City[]>(`${this.baseUrl}/citys`);
  }
}
