import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AirlineDetails } from 'src/app/models/AirlineDetails';
import { AdminService } from 'src/app/services/adminservices.service';

@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})
export class AddAirlineComponent implements OnInit {

  airlineForm = new FormGroup({
    airlineName: new FormControl(''),
    address: new FormControl(''),
    contact: new FormControl(''),}
  );

  successMessage : string="";
  added: Boolean = false;

  constructor(private adminservices: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  addAirline(){
    const promise = this.adminservices.addAirline(this.airlineForm.value);
    promise.subscribe(data=>this.displaySucccessMessage());
    
  }
  displaySucccessMessage(){
    this.successMessage = "Airline was added successfully";
    this.added = true;
    setTimeout(()=>{
      this.router.navigateByUrl("/adminhome")
    },3000)
  }

}


