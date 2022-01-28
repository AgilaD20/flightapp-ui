import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './LoginComponents/register/register.component';
import { LoginComponent } from './LoginComponents/login/login.component';
import { BookingComponent } from './MainComponents/booking/booking.component';
import { BookingmanagerComponent } from './MainComponents/bookingmanager/bookingmanager.component';
import { TicketComponent } from './MainComponents/ticket/ticket.component';
import { BookinghistoryComponent } from './MainComponents/bookinghistory/bookinghistory.component';


const routes: Routes = [{path:"register",component:RegisterComponent},{path:"login",component:LoginComponent
}, {path:"book",component:BookingComponent
}, {path:"bookingmanager", component:BookingmanagerComponent}, {path:"showticket", component:TicketComponent}, {path:"bookinghistory",component:BookinghistoryComponent}];



@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }