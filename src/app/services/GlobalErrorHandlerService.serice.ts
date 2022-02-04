import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { AgDialog } from 'ag-grid-community';


@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(
   // private errorDialogService: ErrorDialogService,
    private zone: NgZone
  ) { }
  handleError(error: any): void {
    // Check if it's an error from an HTTP response
    console.log("error occured");
    
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
      console.log(" got error object");
    }
    this.zone.run(() =>{
        if(error?.status==401){
            ("Please login again with correct credentials or sign up for new user")
        }
        else{
      alert(
        error?.message || 'Undefined client error',
        //error?.status
        
      )
        }
      }
    );

    console.error('Error from global error handler', error);
  }
}
