import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import RegistrationService from 'src/app/services/login.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {

  @Output() userLoggedIn = new EventEmitter<Boolean>();

  loggedIn: Boolean = false;

  constructor(private registrationService: RegistrationService ) { }

  ngOnInit(): void {
    this.registrationService.currentStatusLogin.subscribe(data=>this.loggedIn=data);
    if(sessionStorage.getItem("loggedin")=="true"){
      this.loggedIn=true;
    }
    if(sessionStorage.getItem("whois")=="user"){
      this.userLoggedIn.emit(false);
    }
  }

  setuserLogin(){
    sessionStorage.setItem("whois","user");
    this.userLoggedIn.emit(false);
    this.registrationService.updateAdminLoginStatus(false);
  }

  logout(){

    this.registrationService.adminlogout();
  }

}
