import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import RegistrationService from 'src/app/services/login.service';

export interface userregistrationForm{
  email: String,
  password: String,
  firstName: String,
  lastName: String
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationFrom: userregistrationForm={
    email : "email",
    firstName: "firstname",
    lastName:"lastname",
    password:"password"

  }

  registrationsuccesful=false;

  message : String=""

  constructor(private rservice: RegistrationService, private router:Router) {
    
   }

  ngOnInit(): void {
    
  }

  OnClickSubmit(data: any ){
   
    
this.registrationFrom.email = data.emailid;
this.registrationFrom.firstName = data.firstname;
this.registrationFrom.lastName=data.lastname;
this.registrationFrom.password=data.password;
const promise = this.rservice.save(this.registrationFrom);

promise.subscribe((response)=>{
  
 this. registrationsuccesful=true;
 setTimeout(() => {
  this.router.navigate(['login']);
}, 2000);

});


  }

}
