import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
import { AdminheaderComponent } from './AdminComponents/adminheader/adminheader.component';
import { AdminhomeComponent } from './AdminComponents/adminhome/adminhome.component';
import { AddAirlineComponent } from './AdminComponents/add-airline/add-airline.component';
import { ManagescheduleComponent } from './AdminComponents/manageschedule/manageschedule.component';
//import { GlobalErrorHandlerService } from './services/global-error-handler.service';

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
    AdminheaderComponent,
    AdminhomeComponent,
    AddAirlineComponent,
    ManagescheduleComponent,

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
  providers: [RegistrationService, BookingService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
