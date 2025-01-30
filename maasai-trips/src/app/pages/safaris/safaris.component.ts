import { Component,ViewChild,AfterViewInit,ElementRef,inject,OnInit } from '@angular/core';
import { trigger,keyframes,style,transition,animate } from '@angular/animations';
interface Safaris {
  SafariTitle: string;
  Charges: number;
  Thumbnail: string;
  Inclusivities: string[];
}
import { QuotationsComponent } from '../../components/quotations/quotations.component';
import {MatDialog} from '@angular/material/dialog'
@Component({
  selector: 'app-safaris',
  templateUrl: './safaris.component.html',
  styleUrl: './safaris.component.css',
  animations:[
    trigger('bounceRight', [
      transition('clear => visible', [
        style({
          opacity: 1,
          transform: 'translateX(-48px)'
        }),
        animate(
          '1.55s ease-in-out',
          style({ transform: 'translateX(0px)', opacity: 1 })
        )
      ])
    ])
  ]
})
export class SafarisComponent implements AfterViewInit{
@ViewChild("bg") bgRef!:ElementRef
bgState:string = 'clear'
readonly dialog = inject(MatDialog)


ngOnInit(){
this.requestQuote()
}
requestQuote(){
this.dialog.open(QuotationsComponent)
}

bgBounce(){
var observer = new IntersectionObserver((entries)=>{
entries.map((entry)=>{
if(entry.isIntersecting){
this.bgState = 'visible'
}else{
this.bgState = 'clear'
}

})


})
observer.observe(this.bgRef.nativeElement)
}


ngAfterViewInit(){
this.bgBounce()
}
  safaris: Safaris[] = [
    {
      SafariTitle: 'Masaai Mara 3 days budget',
      Charges: 220,
      Thumbnail: 'https://www.masaimaratrips.com/uploads/package/3-days-mas_20240926120700.jpg',
      Inclusivities: ['Private Tour', 'Safari in a landCruiser'],
    },
    {
      SafariTitle: 'Masaai Mara 3 days 2 nights Enkorok Mara Camp Safari',
      Charges: 320,
      Thumbnail: '../../../assets/enkorok.jpg',
      Inclusivities: ['Private Tour', 'Safari in a landCruiser'],
    },
    {
      SafariTitle: 'Masaai Mara 3 days 2 nights masaai mara group joining',
      Charges: 248,
      Thumbnail: '../../../assets/joining_grp.webp',
      Inclusivities: ['Private Tour', 'Safari in a landCruiser',"shared tour"],
    },
    {
      SafariTitle: 'Masaai Mara 4 days Private Safari Tour',
      Charges: 580,
      Thumbnail: '../../../assets/hilux_baloon.jpg',
      Inclusivities: ['Private Tour', 'Safari in a landCruiser'],
    },
    {
      SafariTitle: 'Masaai Mara 3 days  2 nights Neptune Mara Rianta Luxury Tented Safari',
      Charges: 770,
      Thumbnail: '../../../assets/neptune.jpg',
      Inclusivities: ['Private Tour', 'Safari in a landCruiser'],
    },
    {
      SafariTitle: 'Masaai Mara 3 days 2 nights  Sarova mara game Camp Safari',
      Charges: 543,
      Thumbnail: '../../../assets/sarova.jpg',
      Inclusivities: ['Private Tour', 'Safari in a landCruiser'],
    },
  ];
}
