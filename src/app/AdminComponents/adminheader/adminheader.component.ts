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
  }

  setuserLogin(){
    this.userLoggedIn.emit(false);
  }

  logout(){

    this.registrationService.logout();
  }

}
