import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import RegistrationService from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private registrationService: RegistrationService) {} 

  loggedIn: Boolean = false;

  @Output() adminLoggedIn = new EventEmitter<Boolean>();

  ngOnInit(): void {
    this.registrationService.currentStatusLogin.subscribe(data=>this.loggedIn=data);
    if(sessionStorage.getItem("loggedin")=="true"){
      this.loggedIn=true;
    }
    if(sessionStorage.getItem("whois")=="admin"){
      this.adminLoggedIn.emit(true);
    }
  }

  logout(){
    this.registrationService.userlogout();
  }

  setAdminLogin(){
    sessionStorage.setItem("whois","admin");
    console.log(' setting admin loggedin');
    this.adminLoggedIn.emit(true);  
    this.registrationService.updateAdminLoginStatus(true)
  }

  

}
