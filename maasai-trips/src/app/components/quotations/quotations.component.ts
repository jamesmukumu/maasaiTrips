import { Component,inject } from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import { QuotationsService,Quotations } from '../../services/quotations.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'quotations',
  templateUrl: './quotations.component.html',
  styleUrl: './quotations.component.css',
  providers:[provideNativeDateAdapter()]
})
export class QuotationsComponent {
firstName:string = ""
secondName:string = ""
email:string = ""
phoneNumber:string = ""
roomsCount?:number 
childrenCount?:number
kidsAges:string = ''
adultsCount?:number
travelDescription:string = ""
startDate:string  = ""
endDate:string = ""
processingQuote:boolean = false
readonly dialog = inject(MatDialog)

constructor(private Quote:QuotationsService,private snack:MatSnackBar){}
seeStartDate(event:any){
var {value} = event
this.startDate = new Date(value).toString()
}
endDateFormat(event:any){
var {value} = event
this.endDate = new Date(value).toString()
}

async actualizeSave(){
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
 
var resp = await this.Quote.saveQuotation(payload)

var {message} = resp
switch(message){
case "Quotation added":
  this.processingQuote = false 
  this.snack.open("Saved","Added 😀",{
    horizontalPosition:"center",
    verticalPosition:"bottom"
  })
  this.dialog.closeAll()
  break;
  case "Something Went wrong":
    this.processingQuote = false
    this.dialog.closeAll()
    this.snack.open("Something Went Wrong","Retry again",{
    horizontalPosition:"left",
    verticalPosition:"top"
    })
}
}

}
