import { Component,Input } from '@angular/core';
import { Sanitizer } from '@angular/core';
import { SafeHtml,DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-accomodations-view',
  templateUrl: './accomodations-view.component.html',
  styleUrl: './accomodations-view.component.css'
})
export class AccomodationsViewComponent {
  @Input()destination:any
  constructor(private sanitizor:DomSanitizer){}
  formatter(descp:any){
  return  this.sanitizor.bypassSecurityTrustHtml(descp)
  }
}
