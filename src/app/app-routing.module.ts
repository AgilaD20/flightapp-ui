import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './LoginComponents/register/register.component';
import { LoginComponent } from './LoginComponents/login/login.component';
import { BookingComponent } from './MainComponents/booking/booking.component';
import { BookingmanagerComponent } from './MainComponents/bookingmanager/bookingmanager.component';
import { TicketComponent } from './MainComponents/ticket/ticket.component';
import { BookinghistoryComponent } from './MainComponents/bookinghistory/bookinghistory.component';
import { AdminheaderComponent } from './AdminComponents/adminheader/adminheader.component';
import { AdminhomeComponent } from './AdminComponents/adminhome/adminhome.component';
import { AddAirlineComponent } from './AdminComponents/add-airline/add-airline.component';
import { ManagescheduleComponent } from './AdminComponents/manageschedule/manageschedule.component';


const routes: Routes = [{path:"register",component:RegisterComponent},{path:"login",component:LoginComponent
}, {path:"book",component:BookingComponent
}, {path:"bookingmanager", component:BookingmanagerComponent}, {path:"showticket", component:TicketComponent}, {path:"bookinghistory",component:BookinghistoryComponent},
{path:"adminheader", component: AdminheaderComponent}, {path:"adminhome", component:AdminhomeComponent},
{path:"addairline", component:AddAirlineComponent}, {path:"manageschedule", component:ManagescheduleComponent}];



@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }