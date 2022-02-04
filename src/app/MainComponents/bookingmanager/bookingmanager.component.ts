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
  "departureDate": Date = new Date;
}

export class Passenger {

  "passengerName": string = "";
  "gender": string = "";
  "age": number = 0;
  "seatNumber": string = "";
}

export class Ticket {
  "flightId": number = 0;
  "mealPreference": string = "";
  "price": number = 0;
  "passengerCount": number = 0;
  "passengerdetails": String = "";
  "userName": string = "";
  "userEmail": string = "";
  "seatNumbers": String = "";
  "isCancelled": boolean = false;
  "pnr": number = 0;
  "departureDate": Date = new Date;

}

@Component({
  selector: 'app-bookingmanager',
  templateUrl: './bookingmanager.component.html',
  styleUrls: ['./bookingmanager.component.css']
})
export class BookingmanagerComponent implements OnInit {

  SelectedFlight!: FlightResult;

  selectedReturnFlight : FlightResult = new FlightResult;

  bookingDetails: BookTicket = new BookTicket;

  returnBookingDetails : BookTicket = new BookTicket;

  availableSeats: String[] = [];

  availableReturnSeats : String[] = [];

  PassengerArray: Passenger[] = [];

  returnPassengerArray: Passenger[]=[];

  isReturnJourney : Boolean = false;

  isReturnTicketBooked : Boolean = false;

  bookedTicket: Ticket = {
    flightId: 0,
    mealPreference: '',
    price: 0,
    passengerCount: 0,
    passengerdetails: new String,
    userName: '',
    userEmail: '',
    seatNumbers: new String,
    isCancelled: false,
    pnr: 0,
    departureDate: new Date
  }

  returnBookedTicket : Ticket ={
    flightId: 0,
    mealPreference: '',
    price: 0,
    passengerCount: 0,
    passengerdetails: new String,
    userName: '',
    userEmail: '',
    seatNumbers: new String,
    isCancelled: false,
    pnr: 0,
    departureDate: new Date
  }

  //passengerFrom!: FormGroup;


  createPassengers() {
    return this.fb.group({
      passengerName: [null, Validators.required],
      age: [0, Validators.required],
      gender: [null, Validators.required],
      seatNumber: [0, Validators.required]

    })
  }

  createReturnPassengers() {
    return this.fb.group({
      passengerName: [null, Validators.required],
      age: [0, Validators.required],
      gender: [null, Validators.required],
      seatNumber: [0, Validators.required]

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


  returnPassengerForm = new FormGroup({
    returnPassenger: this.fb.array([this.createReturnPassengers()])
  })

  get passengers(): FormArray {
    return <FormArray>this.passengerForm.get('passengers');
  }

  get returnPassenger(): FormArray{
    return <FormArray>this.returnPassengerForm.get('returnPassenger');
  }

  addPassenger() {
    this.passengers.push(this.createPassengers());
  }

  addReturnPassenger() {
    this.returnPassenger.push(this.createReturnPassengers());
  }

  updatePassenger() {

    this.bookingDetails.passengersList = this.passengers.value
    console.log(this.bookingDetails.passengersList);
    this.bookingDetails.price = this.SelectedFlight.price * this.bookingDetails.passengersList.length;
    this.bookingDetails.passengersList.forEach(v => this.bookingDetails.seatNumbers.push(v.seatNumber));
    this.bookingDetails.departureDate = this.SelectedFlight.departureDate;
    

  }

  updateReturnPassenger() {

    this.returnBookingDetails.passengersList = this.returnPassenger.value
    console.log(this.returnBookingDetails.passengersList);
    this.returnBookingDetails.price = this.selectedReturnFlight.price * this.returnBookingDetails.passengersList.length;
    this.returnBookingDetails.passengersList.forEach(v => this.returnBookingDetails.seatNumbers.push(v.seatNumber));
    this.returnBookingDetails.departureDate = this.selectedReturnFlight.departureDate;
    this.isReturnTicketBooked = true;
    

  }

  setTicketDetails(bookedTicket: Ticket, tripType: String) {
    if(tripType=="onward"){
      this.bookedTicket = bookedTicket;
      this.selectedDataService.updateBookedTicket(this.bookedTicket);
      console.log("booked ticket " + this.bookedTicket);
  
    }
    else if(tripType=="return"){
      this.returnBookedTicket = bookedTicket;
      this.selectedDataService.updateReturnBookedTicket(this.returnBookedTicket);
      console.log("booked ticket " + this.returnBookedTicket);
      
    }
    

  }

  confirmBooking(){
    const promise = this.bookingService.bookticket(this.bookingDetails, this.SelectedFlight.flightID);
    promise.subscribe((response) => {
      this.setTicketDetails(response,"onward");
    });
    if(this.isReturnTicketBooked)
    {
      this.bookingService.bookticket(this.returnBookingDetails, this.selectedReturnFlight.flightID).subscribe((response) => {
        this.setTicketDetails(response,"return");
        this.selectedDataService.udpateIsRetrunJourney(true); 
      });
    }
    this.router.navigateByUrl("/showticket");
  }




  constructor(private selectedDataService: SelectedDataService, private registrationService: RegistrationService, private bookingService: BookingService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.selectedDataService.currentlyIsRetrunJourney.subscribe(data=>
      {
        if(data){
          this.makeReturnFlight();
        }
      });
    this.selectedDataService.currentlySelected.subscribe(data => {
      this.SelectedFlight = data;
    });

    this.bookingService.allavailableSeat({ "flightId": this.SelectedFlight.flightID, "departureDate": this.SelectedFlight.departureDate }).subscribe(data => this.availableSeats = data);
    this.bookingDetails.userEmail = this.registrationService.getuserEmail();
    console.log(this.bookingDetails.userEmail);

  }

  makeReturnFlight(){
      this.selectedDataService.currentlyreturnSelected.subscribe(data=>this.selectedReturnFlight=data);
      this.bookingService.allavailableSeat({ "flightId": this.selectedReturnFlight.flightID, "departureDate": this.selectedReturnFlight.departureDate }).subscribe(data => this.availableReturnSeats = data);
       this.returnBookingDetails.userEmail = this.registrationService.getuserEmail();
      this.selectedDataService.udpateIsRetrunJourney(false); 
      this.isReturnJourney=true;
    }
    
  }



