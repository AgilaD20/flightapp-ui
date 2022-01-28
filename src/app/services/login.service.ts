import { Injectable } from "@angular/core";
import { userregistrationForm } from "../LoginComponents/register/register.component";
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from "src/app/models/user";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
//import { JwtInterceptor } from "src/jwt.interceptor";

export interface jwtResponse {
    jwt: string;
}

@Injectable()
export default class RegistrationService {

    loggedIn: Boolean = false;

    currentStatusLogin = new BehaviorSubject(this.loggedIn);

    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    }

    getToken() {
        return this.cookieService.get("jwt");
    }

    getuserEmail() {
        return this.cookieService.get("useremail");
    }

    getTokenExpiryTime() {
        return this.cookieService.get("jwtexpiry");
    }

    save(user: userregistrationForm) {

        return this.http.post("http://localhost:8083/api/v1.0/user/register", user, {
            headers: {
                "content-type": "application/json"
            }
        })
    }

    login(credential: { userEmail: string, password: string }) {

        return this.http.post<{ jwt: string }>("http://localhost:8083/api/v1.0/user/authenticate", credential, {
            headers: { "content-type": "application/json", }
        }).pipe(map(response => {
            console.log(response);
            var date = new Date();
            date.setTime(date.getTime() + (5 * 60 * 60 * 1000));
            this.cookieService.set("jwt", response.jwt, date);
            this.cookieService.set("useremail", credential.userEmail, date);
            this.updateLoginStatus(true);
        }));
    }

    logout() {
        this.cookieService.delete("jwt");
        this.cookieService.delete("useremail");
        this.updateLoginStatus(false);
        this.router.navigateByUrl("/login");
    }

    updateLoginStatus(currentStatus: Boolean) {
        this.currentStatusLogin.next(currentStatus);
    }

}