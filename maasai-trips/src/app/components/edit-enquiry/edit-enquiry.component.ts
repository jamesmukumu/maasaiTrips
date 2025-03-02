import { Component,OnInit,inject } from '@angular/core';
import {Store} from "@ngrx/store"
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { QuotationsComponent } from '../quotations/quotations.component';
import {provideNativeDateAdapter} from '@angular/material/core';
import { QuotationsService,Quotations } from '../../services/quotations.service';
@Component({
  selector: 'app-edit-enquiry',
  templateUrl: './edit-enquiry.component.html',
  styleUrl: './edit-enquiry.component.css',
  providers:[provideNativeDateAdapter()]
})
export class EditEnquiryComponent implements OnInit {
readonly  snack = inject(MatSnackBar)
readonly dialog = inject(MatDialog)

constructor(private store:Store,private enquiry:QuotationsService){}
firstName:string = ""
secondName:string = ""
kidsAges:string = ''
email:string = ""
phoneNumber:string = ""
roomsCount?:number 
childrenCount?:number
adultsCount?:number
travelDescription:string = ""
startDate:string  = ""
endDate:string = ""
processingQuote:boolean = false
seeStartDate(event:any){
  var {value} = event
  this.startDate = new Date(value).toString()
}
  endDateFormat(event:any){
  var {value} = event
  this.endDate = new Date(value).toString()
  }


updateEnquiry(){
  this.processingQuote = true
  var payload:Quotations = {
    firstName:this.firstName,
    kidsAges:this.kidsAges,
    lastName:this.secondName,
    email:this.email,
    adultsCount:this.adultsCount??0,
    roomsCount:this.roomsCount ?? 0,
    startStayDate:this.startDate,
    endStayDate:this.endDate,
    phoneNumber:this.phoneNumber,
    childrenCount:this.childrenCount ?? 0,  
    travelDescription:this.travelDescription,
 }
this.enquiry.updateEnquiry(payload).then((data)=>{
var {message} = data
if(message == 'Update success'){
this.snack.open("Updated","Close",{
horizontalPosition:"left",
verticalPosition:"top"
})
this.dialog.closeAll()
this.processingQuote = false
}

})
}



ngOnInit(){
this.store.subscribe((data:any)=>{
 
var {enquiry} = data
var unmarhsalledEnquiry = JSON.parse(enquiry)

this.firstName = unmarhsalledEnquiry.firstName
this.secondName = unmarhsalledEnquiry.lastName
this.roomsCount = unmarhsalledEnquiry.roomsCount
this.email = unmarhsalledEnquiry.email
this.adultsCount = unmarhsalledEnquiry.adultsCount
this.travelDescription = unmarhsalledEnquiry.travelDescription
this.phoneNumber = unmarhsalledEnquiry.phoneNumber.toString()
this.childrenCount = unmarhsalledEnquiry.childrenCount
this.kidsAges = unmarhsalledEnquiry.kidsAges
this.startDate = unmarhsalledEnquiry.startStayDate
this.endDate = unmarhsalledEnquiry.endStayDate
})
}




}
