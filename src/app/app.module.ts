import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, } from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { LoginComponent } from './LoginComponents/login/login.component';
import { HeaderComponent } from './MainComponents/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './LoginComponents/register/register.component';

//import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import RegistrationService from './services/login.service';
import BookingService from './services/booking.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './models/jwt.interceptor';
import { BookingComponent } from './MainComponents/booking/booking.component';
import { BookingmanagerComponent } from './MainComponents/bookingmanager/bookingmanager.component';
import { TicketComponent } from './MainComponents/ticket/ticket.component';
import { BookinghistoryComponent } from './MainComponents/bookinghistory/bookinghistory.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    BookingComponent,
    BookingmanagerComponent,
    TicketComponent,
    BookinghistoryComponent,
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
    
  ],
  providers: [RegistrationService, BookingService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
