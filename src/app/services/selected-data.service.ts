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
  flightID:0
};


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
  pnr: 0
}

currentlySelected= new BehaviorSubject(this.Selected);

currentlyBookedTicket = new BehaviorSubject(this.bookedTicket);

  constructor() {
    
   }

   changeValue(changedValue: FlightResult)

   {
     this.currentlySelected.next(changedValue);
   }

   updateBookedTicket(currentTicket: Ticket){
     this.currentlyBookedTicket.next(currentTicket);
   }
}
