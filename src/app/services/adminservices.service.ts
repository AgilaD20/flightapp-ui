import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createFlight } from '../AdminComponents/adminhome/adminhome.component';
import { SearchSchedule } from '../AdminComponents/manageschedule/manageschedule.component';
import { FlightResult } from '../MainComponents/booking/booking.component';
import { AirlineDetails } from '../models/AirlineDetails';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private FLIGHT_URL: string="http://44.201.139.156:8081/api/v1.0/flight/airline";

  addAirline(airlineDetails : AirlineDetails){
    return this.http.post<AirlineDetails>(this.FLIGHT_URL+"/register",airlineDetails);
  }

  getAllAirlines()
  {
    return this.http.get<AirlineDetails[]>(this.FLIGHT_URL+"/allairlines");
  }

  block(airlineName: String){
      return this.http.put(this.FLIGHT_URL+"/blockairline/"+airlineName,"");
  }

  unblock(airlineName: String){
    return this.http.put(this.FLIGHT_URL+"/unblockairline/"+airlineName,"");
}

  getSchedules(searchSchedule: SearchSchedule){
    return this.http.post<FlightResult[]>(this.FLIGHT_URL+"/searchschedule",searchSchedule);
  }

  createFlight(createRequest: createFlight){
    return this.http.post<FlightResult>(this.FLIGHT_URL+"/inventory/add", createRequest);
  }

  updateEndDate(updateSchedulRequest:{flightName: string, endDate: Date}){
    return this.http.put(this.FLIGHT_URL+"/updateschedule",updateSchedulRequest);
  }

  
}
