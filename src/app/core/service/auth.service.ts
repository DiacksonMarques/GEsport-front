import { TokenService } from './token.service';

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { StoreService } from './store.service';
import {Router} from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlBase = `${environment.api}`;

  constructor(
    private httpCLient: HttpClient,
    private storeService: StoreService,
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router,
  ) { }

  authenticate(username: string, password: string) {
    return this.httpCLient
      .post(
        `${this.urlBase}/login`,
        { username, password },
        { observe: 'response' }
      )
      .pipe(
        tap((res: any) => {
          const authToken = res.body.token;
          this.storeService.setToken(authToken);
          this.tokenService.updateIsLogged(true);
          this.router.navigate(['/dashboard']);
        })
      );
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
    this.tokenService.updateIsLogged(false);
  }

}
