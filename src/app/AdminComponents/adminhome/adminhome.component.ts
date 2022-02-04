import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
//import { promises } from 'dns';

import { AirlineDetails } from 'src/app/models/AirlineDetails';
import { AdminService } from 'src/app/services/adminservices.service';

export class createFlight{
  "flightName" : string="";
  "availableSeats": string="";
	"fromLocation": string="";
	"destination": string="";
	"price":number=0;
	"departureDate": Date=new Date;
  "endDate": Date = new Date;
  "airlineName": string="";
  "requestedSchedule" : number[]=[];
}

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  airlines: AirlineDetails[] = [];

  addFlight: Boolean = false;

  added: Boolean = false;

  selectedAirline : string="";

  message: String="Airline was blocked successfully";

  createFlightRequest : createFlight ={
    flightName: '',
    availableSeats: '',
    fromLocation: '',
    destination: '',
    price: 0,
    departureDate: new Date,
    airlineName: '',
    endDate: new Date,
    requestedSchedule: []
  }

  todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  weekdays: string[]=["MON", "TUE", "WED", "THURS", "FRI", "SAT","SUN"];

  selectedSchedule :string[]=[]

  createFlightForm = new FormGroup(
    {
      "flightName" : new FormControl(''),
  "availableSeats": new FormControl(0),
	"fromLocation":new FormControl(''),
	"destination": new FormControl(''),
	"price":new FormControl(0),
	"departureDate": new FormControl(new Date),
  "endDate": new FormControl(new Date),
  "requestedSchedule" : new FormControl('')

    }
  )


  constructor(private adminService : AdminService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    const promise = this.adminService.getAllAirlines();
    promise.subscribe(data=>this.airlines=data);
  }

  block(airlineName: string){
 const promise=this.adminService.block(airlineName);
 promise.subscribe(()=>console.log("Blocked airline"));
 window.location.reload();
  }

  unblock(airlineName: string){
    const promise=this.adminService.unblock(airlineName);
    promise.subscribe(()=>console.log("Unblocked airline"));
    window.location.reload();
     }

     openAddFlight(airlineName: string){
       this.createFlightForm.reset();
      this.added = false;
this.addFlight = true;
this.selectedAirline = airlineName;
     }

     creatflight(data: any, airlineName: string){
       this.createFlightRequest =  data;
       this.createFlightRequest.airlineName = airlineName;
       const promise = this.adminService.createFlight(this.createFlightRequest);
       promise.subscribe(()=>console.log("Flight was added successfully"));
       this.added = true;
       this.addFlight = false;

     }



}
