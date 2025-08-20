import { Component,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testmonials',
  templateUrl: './testmonials.component.html',
  styleUrl: './testmonials.component.css'
})
export class TestmonialsComponent {
constructor(public router:Router){}
go_safaris(){
window.open("/safaris","_self")
}
  @Output() contactFormEmitter = new EventEmitter<string>()
  
contact_us(){
this.contactFormEmitter.emit("contact")
}
}
