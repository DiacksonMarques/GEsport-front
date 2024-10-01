import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from "@angular/core";
import { TokenService } from "../service/token.service";
import { StoreService } from "../service/store.service";

export const loggerInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const tokenService: TokenService = inject(TokenService);
  const storeService: StoreService = inject(StoreService);

  const userToken = tokenService.getToken();

  if(!userToken){
    return next(request);
  }

  if (request.headers.get('skipValidationError') === 'true') {
    return next(request);
  }

  if(userToken){
    request = request.clone({
      headers: request.headers.set('Authorization', `${userToken}`),
    });
  }

  return next(request);
};


