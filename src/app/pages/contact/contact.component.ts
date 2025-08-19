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
      alert('Thank you! Your enquiry has been sent.');
      form.reset();
    } else {
      console.log("invalid form")
      alert('Please fill out all required fields correctly.');
    }
  }
}
