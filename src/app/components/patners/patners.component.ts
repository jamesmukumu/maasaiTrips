import { Component } from '@angular/core';

@Component({
  selector: 'patners',
  templateUrl: './patners.component.html',
  styleUrl: './patners.component.css'
})
export class PatnersComponent {
  baseOuterUrl:string = 'https://www.olankasafaris.com/'
  goOuter(path:string){
  window.open(this.baseOuterUrl + path,"_blank")
   }
}
