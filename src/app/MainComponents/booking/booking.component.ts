import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
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
  endDate: Date = new Date;
  fromLocation: string = "";
  destination: string = "";
  tripType: string = "";

}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  isDisabled: Boolean = true;

  searchNotFound: Boolean = false;

  searchFlight: SearchFlight = new SearchFlight();

  searchReturnFlight: SearchFlight = new SearchFlight();

  departureDate: Date = new Date;

  selected: FlightResult = new FlightResult;

  retrunSelected: FlightResult = new FlightResult;

  flightResults: FlightResult[] = [];
  //rowData: Observable<FlightResult[]>;

  todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  rowData: FlightResult[] = [];

  ReturnrowData: FlightResult[] = [];

  constructor(private bookingService: BookingService, private router: Router, private selectedDataservice: SelectedDataService, private datePipe: DatePipe) {

  }

  columnDefs: ColDef[] = [
    { headerName: 'Airline Name', field: 'airlineName', sortable: true, filter: true },
    { headerName: 'Flight Name', field: 'flightName', sortable: true, filter: true },
    { headerName: 'price', field: 'price', sortable: true, filter: true }
  ];


  gridApi: GridApi = new GridApi;
  gridApi1: GridApi = new GridApi;

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onGridReady1(params: GridReadyEvent) {
    this.gridApi1 = params.api;
  }


  onRowSelected() {
    //alert("you selected a row");
    let selectedRow = this.gridApi.getSelectedRows();
    this.selected = selectedRow[0];
    this.selected.departureDate = this.searchFlight.departureDate;
    this.selectedDataservice.changeValue(this.selected);
    this.selectedDataservice.updateJourneyDate(this.searchFlight.departureDate)
    console.log(this.selected);

  }

  onReturnJourneyRowSelected(){
    
    let selectedRow = this.gridApi1.getSelectedRows();
    this.retrunSelected = selectedRow[0];
    this.retrunSelected.departureDate = this.searchReturnFlight.departureDate;
    this.selectedDataservice.changeReturnValue(this.retrunSelected);
    this.selectedDataservice.updateReturnJourneyDate(this.searchReturnFlight.departureDate);
    this.selectedDataservice.udpateIsRetrunJourney(true);
    console.log(this.retrunSelected);

  }

  ngOnInit(): void {

  }

  redirectToBookingManager() {
    this.router.navigateByUrl("/bookingmanager");
  }

  search() {
    if (this.isDisabled) {
      this.bookingService.book(this.searchFlight).subscribe(
        (response) => {
          this.rowData = response;
        },
        () => {
          this.handleNoError();
        })
    }

    else {
      this.searchReturnFlight.destination = this.searchFlight.fromLocation;
      this.searchReturnFlight.fromLocation = this.searchFlight.destination;
      this.bookingService.book(this.searchFlight).subscribe(
        (response) => {
          this.rowData = response;
        },
        () => {
          this.handleNoError();
        })

      this.bookingService.book(this.searchReturnFlight).subscribe(
        (response) => {
          this.ReturnrowData = response;
        },
        () => {
          this.handleNoError();
        })

    }

  }


  selectRoundTrip() {
    this.isDisabled = !this.isDisabled;
  }

  handleNoError() {
    this.searchNotFound = true;
    console.log("Search didn't return any result");
    setTimeout(() => {
      this.searchNotFound = false;
    }, 3000);

  }

}