import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedDataService } from 'src/app/services/selected-data.service';
import { FlightResult } from '../booking/booking.component';
import { Ticket } from '../bookingmanager/bookingmanager.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  constructor(private selectedDataService: SelectedDataService, private router :Router) { }

  bookedTicket : Ticket={
    flightId: 0,
    mealPreference: '',
    price: 0,
    passengerCount: 0,
    passengerdetails: '',
    userName: '',
    userEmail: '',
    seatNumbers: '',
    isCancelled: false,
    pnr: 0,
    departureDate: new Date
  }

  bookedReturnTicket :Ticket ={
    flightId: 0,
    mealPreference: '',
    price: 0,
    passengerCount: 0,
    passengerdetails: "",
    userName: '',
    userEmail: '',
    seatNumbers: '',
    isCancelled: false,
    pnr: 0,
    departureDate: new Date
  }

  flight!: FlightResult;

  passengerArray : String[]=[];

  returnFlight : FlightResult  = new FlightResult;

  returnpassengerArray : String[]=[];

  isReturnJourney :Boolean = false;

  ngOnInit(): void {
    this.selectedDataService.currentlyIsRetrunJourney.subscribe(res=>{
      if(res){
        this.makeReturnFlight();}}
      );
    this.makeOnwardFlight();
    
    
  }

  makeReturnFlight(){
    console.log("coming here?")
      this.selectedDataService.currentlyBookedReturnTicket.subscribe(res => this.bookedReturnTicket=res);
    this.selectedDataService.currentlyreturnSelected.subscribe(res=> this.returnFlight=res);
      this.extractPassengerDetails("return");
      this.selectedDataService.udpateIsRetrunJourney(false);
      this.isReturnJourney=true;

  }

  makeOnwardFlight(){
    this.selectedDataService.currentlyBookedTicket.subscribe(res => {this.bookedTicket=res;
    this.extractPassengerDetails("onward");});
    this.selectedDataService.currentlySelected.subscribe(res=> this.flight=res);
    //this.extractPassengerDetails("onward");
  }
  extractPassengerDetails(triptype:String){
    if(triptype=="onward"){
      console.log("going here");
      this.passengerArray = this.bookedTicket.passengerdetails.split("|");
    }
    else if(triptype=="return"){
      this.returnpassengerArray=this.bookedReturnTicket.passengerdetails.split("|")
    }
  }

  gotoHistory(){
    this.router.navigateByUrl("/bookinghistory");
  }



}
