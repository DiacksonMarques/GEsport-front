import {HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpStatusCode,} from '@angular/common/http';
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { StoreService } from "../service/store.service";
import { catchError, throwError } from 'rxjs';

const warningHandler = (_: any, storeService: StoreService, message: string) => {
  storeService.showMessage({
    title: "Aviso",
    subTitle: message,
    footer: "Revise os dados e tente novamente",
    timing: 5000,
    type: "warning",
  });
}

const internalServerErrorHandler = (_: any, storeService: StoreService, message: string) => {
  storeService.showMessage({
    title: "Ops, algo deu errado!",
    subTitle: message,
    footer: "Tente novamente mais tarde ou acione o administrador do sistema",
    timing: 5000,
    type: "error",
  });
}

const unauthorizedHandler = (router: Router) => {
  localStorage.clear();
  return router.navigate(['/login']);
}

const statusCodeHandler = {
  [HttpStatusCode.NotFound]: warningHandler,
  [HttpStatusCode.BadRequest]: warningHandler,
  [HttpStatusCode.Unauthorized]: unauthorizedHandler,
};

export const errorInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {

  const storeService: StoreService = inject(StoreService);
  const router: Router = inject(Router);


  return next(request).pipe(catchError(err => {
    const handler = statusCodeHandler[err.status as keyof typeof statusCodeHandler];

    if (handler) {
      handler(router, storeService, err.error.messages.error);
      return throwError(() => err);
    }

    internalServerErrorHandler(router, storeService, err.error && err.error.messages?.error ? err.error.messages.error : 'Error interno contate o admnistrador')

    return throwError(() => err);
  }));
};


