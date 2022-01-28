import { Component, OnInit } from '@angular/core';
import { SelectedDataService } from 'src/app/services/selected-data.service';
import { FlightResult } from '../booking/booking.component';
import RegistrationService from 'src/app/services/login.service';
import BookingService from 'src/app/services/booking.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

export class BookTicket {
  "mealPreference": string = "";
  "userEmail": string = "";
  "passengersList": Passenger[] = [];
  "price": number = 0;
  "seatNumbers": string[] = [];
}

export class Passenger{

  "passengerName":string="";
  "gender":string="";
  "age":number=0;
  "seatNumber":string="";
}

export class Ticket{
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

}

@Component({
  selector: 'app-bookingmanager',
  templateUrl: './bookingmanager.component.html',
  styleUrls: ['./bookingmanager.component.css']
})
export class BookingmanagerComponent implements OnInit {

  SelectedFlight!: FlightResult;

  bookingDetails: BookTicket = new BookTicket;

  availableSeats: String[]=[];

  PassengerArray : Passenger[]=[];

bookedTicket : Ticket={
  flightId: 0,
  mealPreference: '',
  price: 0,
  passengerCount: 0,
  passengerdetails: new String,
  userName: '',
  userEmail: '',
  seatNumbers: new String,
  isCancelled: false,
  pnr: 0
}

passengerFrom! :FormGroup;

// createPassenger(){
//   return new FormGroup({
//     passengerName: new FormControl(""),
//     age : new FormControl(),
//     gender: new FormControl(),
//     seatNumber :new FormControl()
//   })
// }

createPassengers(){
  return this.fb.group({
    passengerName:[null,Validators.required],
    age:[0, Validators.required],
    gender:[null,Validators.required],
    seatNumber:[0,Validators.required]

  })
}
// passengerForm = new FormGroup({
//   passengerName: new FormControl(""),
//   age : new FormControl(),
//   gender: new FormControl(),
//   seatNumber :new FormControl()
// })

passengerForm = new FormGroup({
  passengers: this.fb.array([this.createPassengers()])
})

get passengers():FormArray{
  return <FormArray> this.passengerForm.get('passengers');
}

addPassenger() {
  this.passengers.push(this.createPassengers());
}

updatePassenger(){

  this.bookingDetails.passengersList=this.passengers.value
  console.log(this.bookingDetails.passengersList);
  this.bookingDetails.price=this.SelectedFlight.price*this.bookingDetails.passengersList.length;
  this.bookingDetails.passengersList.forEach(v =>this.bookingDetails.seatNumbers.push(v.seatNumber));
  const promise = this.bookingService.bookticket(this.bookingDetails,this.SelectedFlight.flightID);
 promise.subscribe((response) =>{console.log("why not inside");
console.log(response);
this.setTicketDetails(response);});

}

setTicketDetails(bookedTicket :Ticket){
 this.bookedTicket=bookedTicket;
  this.selectedDataService.updateBookedTicket(this.bookedTicket);
  console.log("booked ticket "+this.bookedTicket);
  this.router.navigateByUrl("/showticket");


}




  constructor(private selectedDataService: SelectedDataService, private registrationService: RegistrationService, private bookingService: BookingService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.selectedDataService.currentlySelected.subscribe(data => {
      this.SelectedFlight = data;
    });
    this.bookingService.allavailableSeat(this.SelectedFlight.flightID).subscribe(data=>this.availableSeats=data);
    this.bookingDetails.userEmail=this.registrationService.getuserEmail();
    console.log(this.bookingDetails.userEmail);
    
  }

 


}
