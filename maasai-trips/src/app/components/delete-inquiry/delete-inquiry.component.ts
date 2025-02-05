import { Component,inject,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuotationsService } from '../../services/quotations.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Store} from "@ngrx/store"
@Component({
  selector: 'app-delete-inquiry',
  templateUrl: './delete-inquiry.component.html',
  styleUrl: './delete-inquiry.component.css'
})
export class DeleteInquiryComponent  implements OnInit{
targetEmail:string = ""
readonly dialog = inject(MatDialog)
readonly snack = inject(MatSnackBar)
constructor(private enquiry:QuotationsService,private store:Store){}


actualizeDelete(){
this.enquiry.deleteEnquiry(this.targetEmail).then((data)=>{
var {message} = data
if(message  == 'Success'){
this.dialog.closeAll()
this.snack.open("Deleted","cancel",{
horizontalPosition:"left",
verticalPosition:"top"
})
}else if (message == 'Email not found'){
this.snack.open("Enquiry not found","Close",{
  horizontalPosition:"left",
  verticalPosition:"top"
})
}

})


}


ngOnInit(){
this.store.subscribe((data:any)=>{
console.log(data)
var {enquiry} = data
this.targetEmail = enquiry.email
})
}




}
