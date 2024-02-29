import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { MessageRequest } from '../models/message';
import { City } from '../models/Citys';
import { MessageComponent } from '../../../shared/message/message.component';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  // Interfaces
  private isLoggedBS = new BehaviorSubject<boolean>(false);

  public isLogged$ = this.isLoggedBS.asObservable();

  private baseUrl = `${environment.api}`;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private dialog: MatDialog
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

  showMessage(messageRequest: MessageRequest): Observable<any>{
    const dialogRef =  this.dialog.open(MessageComponent, {
      data: messageRequest
    })

    return dialogRef.afterClosed();
  }
}
