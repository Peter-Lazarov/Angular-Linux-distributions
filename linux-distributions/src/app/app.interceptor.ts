import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { apiObject } from '../environments/variables';
import { ErrorService } from "../app/error/error.service";
import { Router } from "@angular/router";

@Injectable()
class AppInterceptor implements HttpInterceptor {
  apiPrefix = '/api';

  constructor(private errorService: ErrorService, private router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith(this.apiPrefix)) {
      //console.log(request.url);
      //console.log(request.url.replace(this.apiPrefix, apiObject.apiUrl));
      
      request = request.clone({
        url: request.url.replace(this.apiPrefix, apiObject.apiUrl),
        withCredentials: true
      })
    }

    return next.handle(request).pipe(catchError((error) => {
      this.errorService.setError(error);
      //console.log(error);
      
      if (error.status == 401) {
        //this.router.navigate(['/user/login']);
      } else {
        this.errorService.setError(error);
        this.router.navigate(['/error']);
      }
      return [error];
    }))
  }
}

export const AppInterceptorProvider: Provider = {
  useClass: AppInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS
}
