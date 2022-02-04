import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import RegistrationService from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  adminLoggedIn: Boolean = false;

  loginFailed :Boolean = false;

  constructor(private service: RegistrationService, private router: Router) { }

  ngOnInit(): void {
    this.service.currentAdminLogin.subscribe(data => this.adminLoggedIn = data);
    if (sessionStorage.getItem("whois") == "admin") {
      this.adminLoggedIn = true;
      console.log('Admin loggedin');
    }
  }

  login(data: any) {
    if (this.adminLoggedIn) {
      const promise = this.service.adminlogin({ userEmail: data.email, password: data.password });
      promise.subscribe(response => {
        console.log(response);
        this.router.navigateByUrl("/adminhome");
      },
      ()=>{this.loginFailed=true;})

    }
    else {
      const promise = this.service.login({ userEmail: data.email, password: data.password });
      promise.subscribe(response => {
        console.log(response);
        this.router.navigateByUrl("/book");
      },
      ()=>{this.loginFailed=true;})
      
    }
  }




}
