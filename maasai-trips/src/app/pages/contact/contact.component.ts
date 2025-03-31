import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

goMail(){
window.open("mailto:jamesmukumu03@gmail.com")
}
goPhone(){
  window.open("tel:+254759857032")
  }




}
