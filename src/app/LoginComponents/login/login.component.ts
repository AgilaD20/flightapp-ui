import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import RegistrationService from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: RegistrationService, private router : Router) { }

  ngOnInit(): void {
  }

  login(data:any){
    console.log("works")
    const promise = this.service.login({userEmail:data.email,password:data.password});
    promise.subscribe(response=>{
console.log(response);
    })
    this.router.navigateByUrl("/book");

  }

}
