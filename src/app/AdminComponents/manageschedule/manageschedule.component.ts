import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FlightResult } from 'src/app/MainComponents/booking/booking.component';
import { AirlineDetails } from 'src/app/models/AirlineDetails';
import { AdminService } from 'src/app/services/adminservices.service';

export class SearchSchedule{
  "airlineName": string="";
	
	"fromLocation":string="";
	
	"destination":string="";
}

@Component({
  selector: 'app-manageschedule',
  templateUrl: './manageschedule.component.html',
  styleUrls: ['./manageschedule.component.css']
})
export class ManagescheduleComponent implements OnInit {

  airlineNames : String[]=[];

  flightResult : FlightResult[] = []

  searchdone: Boolean= false;

  SearchScheduleForm = new FormGroup({
    airlineName: new FormControl(""),
    fromLocation: new FormControl(""),
    destination: new FormControl("")
  })


  constructor(private adminservice: AdminService) { }

  ngOnInit(): void {
    this.adminservice.getAllAirlines().subscribe(data=>this.getairlines(data));
  }
  OnClickSubmit(data: any){

  }
  getairlines(data: AirlineDetails[]){
    this.airlineNames = data.map(s=>s.airlineName)
  }

  getSchedules(data: SearchSchedule){
    const promise = this.adminservice.getSchedules(data);
    promise.subscribe(data=>this.getSearchResult(data));
    
  }

  getSearchResult(data: FlightResult[]){
    this.flightResult=data;
    this.searchdone = true;
  }

  updateSchedule(){
    
  }

}
