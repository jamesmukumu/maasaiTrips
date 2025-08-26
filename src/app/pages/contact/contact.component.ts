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
  constructor(private msg: MessageService, private enquiry: QuotationsService) {}
  
  saving = false;

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.saving = true;
      const { email, firstName, phone, message, contact } = form.value;

      let [actualFirst, ...rest] = firstName.split(" ");
      let second_name = rest.join(" ");

      const payload: any = {
        firstName: actualFirst,
        lastName: second_name,
        email: email,
        phoneNumber: phone,
        contactPreference: contact,
        travelDescription: message,
        adultsCount: 0,
        roomsCount: 0,
        startStayDate: new Date().toISOString(),
        endStayDate: new Date().toISOString(),
        childrenCount: 0,
      }; 

      this.enquiry.saveQuotation(payload)
        .then((data: any) => {
          if (data.message === "Quotation added") {
            this.msg.add({
              detail: "Enquiry received",
              severity: "success",
              sticky: true
            });
          }
          this.saving = false;
          form.reset();
        })
        .catch((err) => {
          this.msg.add({
            detail: "Error Processing form",
            severity: "error",
            sticky: true
          });
          console.error(err);
          this.saving = false;
        });

    } else {
      console.log("invaluid")
      this.msg.add({
        severity: "error",
        detail: "Ensure all required fields are filled"
      });
      // mark all controls as touched to trigger validation messages
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        control.markAsTouched();
      });
  
    }
  }
}
