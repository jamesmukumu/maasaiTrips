import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'] // corrected "styleUrl" to "styleUrls"
})
export class ContactComponent {
  
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form submitted:', form.value);
 
      form.reset();
    } else {
      
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
  
}
