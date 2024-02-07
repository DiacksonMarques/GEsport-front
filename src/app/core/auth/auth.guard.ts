import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot,} from '@angular/router';
import { StoreService } from '../service/store.service';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard{
  constructor(
    private storeService: StoreService,
    private tokenService: TokenService,
    private router: Router,
  ) {}

  async canActivate(__: ActivatedRouteSnapshot, _: RouterStateSnapshot): Promise<boolean | Observable<boolean> | Promise<boolean>> {
    const isLogged = await this.storeService.isLogged();

    if (!isLogged) {
      if(this.tokenService.getToken()){
        this.tokenService.removeToken();
      }
      return this.router.navigate(['/login']);
    }

    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardLogin{
  constructor(
    private storeService: StoreService,
    private router: Router,
  ) {}

  async canActivate(__: ActivatedRouteSnapshot, _: RouterStateSnapshot): Promise<boolean | Observable<boolean> | Promise<boolean>> {
    const isLogged = await this.storeService.isLogged();

    if (isLogged) {
      return this.router.navigate(['/dashboard']);
    }

    return true;
  }
}
