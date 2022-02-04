import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FlightResult } from '../MainComponents/booking/booking.component';
import { Ticket } from '../MainComponents/bookingmanager/bookingmanager.component';

@Injectable({
  providedIn: 'root'
})
export class SelectedDataService {

private Selected: FlightResult ={
  airlineName: '',
  flightName: '',
  availableSeats: 0,
  price: 0,
  departureDate: new Date,
  fromLocation: '',
  destination: '',
  tripType: '',
  flightID: 0,
  endDate: new Date
};

private ReturnSelected: FlightResult ={
  airlineName: '',
  flightName: '',
  availableSeats: 0,
  price: 0,
  departureDate: new Date,
  fromLocation: '',
  destination: '',
  tripType: '',
  flightID: 0,
  endDate: new Date
};
private journeyDate: Date= new Date;
private returnJourneyDate: Date = new Date;

private returnbookedTicket : Ticket={
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

private bookedTicket: Ticket = {
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

isReturnJourney : Boolean = false;

currentlyIsRetrunJourney = new BehaviorSubject(this.isReturnJourney);

currentlySelected= new BehaviorSubject(this.Selected);

currentlyBookedTicket = new BehaviorSubject(this.bookedTicket);

currentlyJourneyDate = new BehaviorSubject(this.journeyDate);

currentlyreturnSelected = new BehaviorSubject(this.ReturnSelected);

currentlyReturnJourneyDate = new BehaviorSubject(this.returnJourneyDate);

currentlyBookedReturnTicket = new BehaviorSubject(this.returnbookedTicket);

  constructor() {
    
   }

   changeValue(changedValue: FlightResult)

   {
     this.currentlySelected.next(changedValue);
   }

   updateBookedTicket(currentTicket: Ticket){
     this.currentlyBookedTicket.next(currentTicket);
   }

   updateJourneyDate(currentJourneyDate: Date){
     this.currentlyJourneyDate.next(currentJourneyDate);
   }

   changeReturnValue(changedValue: FlightResult){
     this.currentlyreturnSelected.next(changedValue);
   }

   updateReturnJourneyDate(currentReturnJourneyDate: Date){
     this.currentlyReturnJourneyDate.next(currentReturnJourneyDate);
   }

   udpateIsRetrunJourney(currentValue: Boolean){
     this.currentlyIsRetrunJourney.next(currentValue);
   }

   updateReturnBookedTicket(currentValue: Ticket){
this.currentlyBookedReturnTicket.next(currentValue);
   }
}