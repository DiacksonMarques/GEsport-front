import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/User';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private baseUrl = `${environment.api}`;

  private cahceUser: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  getUser(): Observable<User>{
    this.tokenService.isLogged$.subscribe(
      value => {
        if(!value){
          this.cahceUser.next(null);
        }
      }
    )
    if(this.cahceUser.getValue()){
      return new Observable<User>((observer) =>{
        observer.next(this.cahceUser.getValue());
      });
    }
    return this.httpClient.get<User>(`${this.baseUrl}/user`)
    .pipe(map(response => {
      this.cahceUser.next(response);
      return this.cahceUser.getValue();
    }));
  }
}
