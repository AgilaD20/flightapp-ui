import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import BookingService from 'src/app/services/booking.service';
import { SearchFlight } from 'src/app/models/SearchFlight';
import { Router } from '@angular/router';
import { SelectedDataService } from 'src/app/services/selected-data.service';

export class FlightResult {
  airlineName: string = "";
  flightID: number = 0;
  flightName: string = "";
  availableSeats: number = 0;
  price: number = 0;
  departureDate: Date = new Date;
  fromLocation: string = "";
  destination: string = "";
  tripType: string = "";

}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  isDisabled : Boolean=true;

  searchNotFound : Boolean = false;

  searchFlight: SearchFlight = new SearchFlight();

  //flightResult: FlightResult[] = [];

  selected: FlightResult = new FlightResult;

  flightResults: FlightResult[] = [];
  //rowData: Observable<FlightResult[]>;

  rowData: FlightResult[] = [];

  constructor(private bookingService: BookingService, private router: Router, private selectedDataservice: SelectedDataService) {

  }

  columnDefs: ColDef[] = [
    { headerName: 'Airline Name', field: 'airlineName', sortable: true, filter: true },
    { headerName: 'Logo', field: 'Logo', sortable: true, filter: true },
    { headerName: 'price', field: 'price', sortable: true, filter: true }
  ];


  gridApi: GridApi = new GridApi;

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }


  onRowSelected() {
    alert("you selected a row");
    let selectedRow = this.gridApi.getSelectedRows();
    this.selected = selectedRow[0];
    this.selectedDataservice.changeValue(this.selected);
    console.log(this.selected);
 

  }

  ngOnInit(): void {

  }

  redirectToBookingManager() {
    this.router.navigateByUrl("/bookingmanager");
  }

  search() {

    this.bookingService.book(this.searchFlight).subscribe(
     (response) => {
      this.rowData = response;
    },
    ()=>{
      this.handleNoError();
    })
  }

  selectRoundTrip(){
    this.isDisabled=!this.isDisabled;
  }

  handleNoError(){
    this.searchNotFound=true;
    console.log("Search didn't return any result");
    setTimeout(()=>{
      this.searchNotFound=false;
    },3000);
    
  }

}