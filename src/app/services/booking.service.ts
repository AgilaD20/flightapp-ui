import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { SearchFlight} from "../models/SearchFlight"
import { FlightResult } from "../MainComponents/booking/booking.component";
import { BookTicket, Ticket } from "../MainComponents/bookingmanager/bookingmanager.component";
import { Booking } from "../MainComponents/bookinghistory/bookinghistory.component";


@Injectable()
export default class BookingService{

    
    constructor(private http: HttpClient) {
       
    }
    //private FLIGHT_URL: string="http://localhost:8083/api/v1.0/user/flight";
    private FLIGHT_URL: string="http://54.166.243.163:8083/api/v1.0/user/flight";

    book(searchflight:SearchFlight){
        return this.http.post<FlightResult[]>(this.FLIGHT_URL+"/search",searchflight,{
            headers:{
                "content-type":"application/json",
            }
        })
    }

    allavailableSeat(searchRequest:any){
        return this.http.post<String[]>(this.FLIGHT_URL+"/availableseats/",searchRequest,{
            headers:{
                "content-type": "application/json"
            }
        })
    }

    bookticket(bookticket: BookTicket, flightid: number )
    {
      return this.http.post<Ticket>(this.FLIGHT_URL+"/booking/"+flightid,bookticket,{
    headers:{
        "content-type":"application/json"
    }
      })
    }

    getAllBookings(email: String)
    {
      return this.http.get<Booking[]>(this.FLIGHT_URL+"/booking/history/"+email,{
    headers:{
        "content-type":"application/json"
    }
      })
    }

    cancelTicket(pnr : number){
        return this.http.delete(this.FLIGHT_URL+"/booking/cancel/"+pnr);
      }

    
}