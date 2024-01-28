// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable } from "rxjs";

// @Injectable({
//     providedIn: "root"
// })

// export class AuthInterceptor implements HttpInterceptor{
//     intercept(
//         request: HttpRequest<any>, 
//         next: HttpHandler
//     ): Observable<HttpEvent<any>> {
//         const userOnline = JSON.stringify(localStorage.getItem("userOnline") || "");

//         // On s'assure que userOnline et userOnline.authorization sont définis
//         if ( userOnline &&  userOnline.message) {}
//         const token =  localStorage.getItem("leToken");

//         if(token){
//             request = request.clone({
//                 setHeaders: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
//         }
//         return next.handle(request)
//     }
// }
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userConnect = JSON.parse(localStorage.getItem('userConnect') || '');

    // Assurez-vous que userConnect et userConnect.authorization sont définis
    if ( userConnect && userConnect.token) {
      const token = userConnect.token;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}