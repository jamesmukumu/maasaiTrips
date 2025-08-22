import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { QuotationsService } from '../../services/quotations.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers:[MessageService]
})
export class ContactComponent {
  constructor(private msg:MessageService,private enquiry:QuotationsService){}
  saving = false
  onSubmit(form: NgForm) {
    if (form.valid) {
    this.saving = true
      var {email,firstName,phone,message} = form.value
      let [actualFirst,...rest] = firstName.split(" ")
      let second_name = rest.join(" ")
      var payload:any = {
        firstName:actualFirst,
        lastName:second_name,
        email:email,
        adultsCount:0,
roomsCount:0,
startStayDate:new Date().toISOString(),
endStayDate:new Date().toISOString(),

childrenCount:0,
        phoneNumber:phone,
        travelDescription:message,
        }
        this.enquiry.saveQuotation(payload).then((data:any)=>{
          if(data.message == "Quotation added"){
          this.msg.add({
          detail:"Enquiry received",
          severity:"success",
          sticky:true
          })
          this.saving = false
          }
        }).catch((err)=>{
          this.msg.add({
            detail:"Error Processing form",
            severity:"error",
            sticky:true
            })
          console.error(err)
          this.saving = false
        })
       form.reset();
    } else {
      
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      this.msg.add({
      severity:"error",
      detail:"Ensure all fields are filled"
      })
    }
  }
  
}
