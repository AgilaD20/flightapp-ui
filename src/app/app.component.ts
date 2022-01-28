import { Component } from '@angular/core';
import RegistrationService from 'src/app/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flightapp-ui';

  constructor(private registrationService: RegistrationService ){

  }

}
