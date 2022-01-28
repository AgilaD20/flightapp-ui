import { Component, OnInit } from '@angular/core';
import BookingService from 'src/app/services/booking.service';
import RegistrationService from 'src/app/services/login.service';


export class Booking{
  "flightId": number=0;
    "mealPreference":string="";
    "price": number=0;
    "passengerCount": number=0;
    "passengerdetails": String="";
    "userName": string="";
    "userEmail": string="";
    "seatNumbers": String="";
    "isCancelled": boolean=false;
    "pnr": number=0;
    "airlineName": string="";
    "flightName": string= "";
    "destination": string="";
    "fromLocation": string="";
    "departureDate": Date = new Date;

}

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.css']
})
export class BookinghistoryComponent implements OnInit {

  bookings : Booking[]=[];

  constructor(private bookingService: BookingService, private registrationService : RegistrationService) { }

  ngOnInit(): void {
    const promise= this.bookingService.getAllBookings(this.registrationService.getuserEmail());
    promise.subscribe(data=>this.setBookings(data));

  }

  setBookings(data: Booking[]){
this.bookings = data;
  }

}
