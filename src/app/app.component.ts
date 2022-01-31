import { Component } from '@angular/core';
import RegistrationService from 'src/app/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flightapp-ui';

  adminLoginStatus: Boolean = false;

  constructor(private registrationService: RegistrationService ){

  }
 
  switchHeader(newStatus: Boolean){
    this.adminLoginStatus = newStatus;
  }
  

}
