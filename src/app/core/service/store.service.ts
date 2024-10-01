import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { City } from '../models/Citys';
import { MessageComponent } from '../../../shared/message/message.component';
import { MessageRequest } from '../models/Message';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  private baseUrl = `${environment.api}`;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private dialog: MatDialog
  ) {}

  public setToken(token: string): void {
    this.tokenService.setToken(token);
  }

  public async isLogged(): Promise<boolean>{
    if(this.tokenService.getIsLogged()){
      this.tokenService.updateIsLogged(true);
      return new Promise<boolean>(resolve => resolve(true));
    }
    const {token} = await firstValueFrom(this.httpClient.post<{token: boolean}>(`${this.baseUrl}/checkToken`, {token: this.tokenService.getToken()}), { defaultValue: {token: false} });
    this.tokenService.updateIsLogged(token);

    return token;
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

  showDataMenu(role: string): Observable<Role>{
    return this.httpClient.get<Role>(`${this.baseUrl}/menus/${role}`);
  }
}
