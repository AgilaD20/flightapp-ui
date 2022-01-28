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
    pnr: 0
  }

  flight!: FlightResult;

  passengerArray : String[]=[];

  ngOnInit(): void {
    this.selectedDataService.currentlyBookedTicket.subscribe(res => this.bookedTicket=res);
    this.selectedDataService.currentlySelected.subscribe(res=> this.flight=res);
    this.extractPassengerDetails();
  }

  extractPassengerDetails(){
    this.passengerArray = this.bookedTicket.passengerdetails.split("|");
  }

  gotoHistory(){
    this.router.navigateByUrl("/bookinghistory");
  }



}
