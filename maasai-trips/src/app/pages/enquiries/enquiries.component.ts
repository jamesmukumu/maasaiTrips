import { Component,OnInit,inject } from '@angular/core';
import { QuotationsService } from '../../services/quotations.service';
import {Store} from "@ngrx/store"
import { editEnquiryAction } from '../../redux/actions/editIInquiry.action';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditEnquiryComponent } from '../../components/edit-enquiry/edit-enquiry.component';
import { DeleteInquiryComponent } from '../../components/delete-inquiry/delete-inquiry.component';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'enquiries',
  templateUrl: './enquiries.component.html',
  styleUrl: './enquiries.component.css'
})


export class EnquiriesComponent implements OnInit {
  private readonly dialog = inject(MatDialog)
constructor(private quotations:QuotationsService,private store:Store){}
processingFetchRequest:boolean = false
tabularData:any
dataPresent = false
displayedColumns:string[] = ["firstname","email","adults","childrenCount","enquiry-status","rooms","startDate",'endDate','action']
displayedColumnsMobile:string[] = ["firstname","startDate",'endDate','action']
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.tabularData.filter = filterValue.trim().toLowerCase();
}

saveInfo(element:any){
var elementString = JSON.stringify(element)
this.store.dispatch(editEnquiryAction({editValue:elementString}))
this.editor()
}
editor(){
this.dialog.open(EditEnquiryComponent,{
 

})
}
showDelete(){
this.dialog.open(DeleteInquiryComponent,{
  disableClose:true
})
}


fetchingEnquiryData(){
this.processingFetchRequest = true
this.quotations.fetchQuotations().then((dataa)=>{
var {data} = dataa
if( dataa == 'No Active Enquiries'){
this.processingFetchRequest = false
this.dataPresent = false

}else{
  this.tabularData = new MatTableDataSource(data)

  this.processingFetchRequest = false
}

})
}
formatDate(date:any){
return new Date(date).toLocaleString()
}

ngOnInit(){

this.fetchingEnquiryData()
}
}
