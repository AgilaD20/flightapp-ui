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

  addAirline(airlineDetails : AirlineDetails){
    return this.http.post<AirlineDetails>("http://localhost:8081/api/v1.0/flight/airline/register",airlineDetails);
  }

  getAllAirlines()
  {
    return this.http.get<AirlineDetails[]>("http://localhost:8081/api/v1.0/flight/airline/allairlines");
  }

  block(airlineName: String){
      return this.http.put("http://localhost:8081/api/v1.0/flight/airline/blockairline/"+airlineName,"");
  }

  unblock(airlineName: String){
    return this.http.put("http://localhost:8081/api/v1.0/flight/airline/unblockairline/"+airlineName,"");
}

  getSchedules(searchSchedule: SearchSchedule){
    return this.http.post<FlightResult[]>("http://localhost:8081/api/v1.0/flight/airline/searchschedule",searchSchedule);
  }

  createFlight(createRequest: createFlight){
    return this.http.post<FlightResult>("http://localhost:8081/api/v1.0/flight/airline/inventory/add", createRequest);
  }

  
}
