import { Component,Input } from '@angular/core';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
@Input() roomData:any
constructor(private sanitizer:DomSanitizer){}
description:SafeHtml  = ''
formatPhotos(){
return JSON.parse(this.roomData.roomImages)
}

formatDescription(): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(this.roomData.roomDescription);
}


}
