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
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  isDisabled : Boolean=true;

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


  // saveSelect() {
  //   alert("you selected a row");
  //   let selectedRow = this.gridApi.getSelectedRows();
  //   this.selected= selectedRow[0];

  //   console.log(this.selected);
  // }

  onRowSelected() {
    alert("you selected a row");
    let selectedRow = this.gridApi.getSelectedRows();
    this.selected = selectedRow[0];
    this.selectedDataservice.changeValue(this.selected);
    console.log(this.selected);
    //console.log($event);

  }

//    gridOptions : GridOptions = {
//     // set background colour on every row, this is probably bad, should be using CSS classes
//     rowStyle: { background: 'black' },

//     // set background colour on even rows again, this looks bad, should be using CSS classes
    

//     // other grid options ...
// }


  ngOnInit(): void {

  }

  // this.selectedDataservice.currentlySelected.subscribe(data=>{
  //   this.selected=data;
  // });

  redirectToBookingManager() {
    this.router.navigateByUrl("/bookingmanager");
  }

  search() {

    this.bookingService.book(this.searchFlight).subscribe(response => {
      this.rowData = response;
    })
  }

  selectRoundTrip(){
    this.isDisabled=!this.isDisabled;
  }

}