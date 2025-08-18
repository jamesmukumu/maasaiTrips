import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'feature-safaris',
  templateUrl: './feature-safaris.component.html',
  styleUrl: './feature-safaris.component.css'
})
export class FeatureSafarisComponent {
@Input() featureSafaris:any

priceFormatter(charge:any){
  return charge.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
}
constructor(private route:Router){}
seeSafari(slug:any){
window.open(`/safaris/${slug}`,"_blank")
}
}
