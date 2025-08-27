import { Component,Input } from '@angular/core';
import { Sanitizer } from '@angular/core';
import { SafeHtml,DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-destination-view',
  templateUrl: './destination-view.component.html',
  styleUrl: './destination-view.component.css'
})
export class DestinationViewComponent {
@Input()destination:any
constructor(private sanitizor:DomSanitizer){}
formatter(descp:any){
return  this.sanitizor.bypassSecurityTrustHtml(descp)
}
}
