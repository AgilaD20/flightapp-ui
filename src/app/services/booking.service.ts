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

    book(searchflight:SearchFlight){
        return this.http.post<FlightResult[]>("http://localhost:8083/api/v1.0/user/flight/search",searchflight,{
            headers:{
                "content-type":"application/json",
            }
        })
    }

    allavailableSeat(flightid: number){
        return this.http.get<String[]>("http://localhost:8083/api/v1.0/user/flight/availableseats/"+flightid,{
            headers:{
                "content-type": "application/json"
            }
        })
    }

    bookticket(bookticket: BookTicket, flightid: number )
    {
      return this.http.post<Ticket>("http://localhost:8083/api/v1.0/user/flight/booking/"+flightid,bookticket,{
    headers:{
        "content-type":"application/json"
    }
      })
    }

    getAllBookings(email: String)
    {
      return this.http.get<Booking[]>("http://localhost:8083/api/v1.0/user/flight/booking/history/"+email,{
    headers:{
        "content-type":"application/json"
    }
      })
    }

    

    
}