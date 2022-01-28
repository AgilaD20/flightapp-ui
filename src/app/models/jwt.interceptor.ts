import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import RegistrationService from 'src/app/services/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private registrationService: RegistrationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        console.log(Date.now());
        console.log(this.registrationService.getTokenExpiryTime());
        let jwt = this.registrationService.getToken();
        if (jwt!=null) {
          
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            
        }

        return next.handle(request);
    }
}