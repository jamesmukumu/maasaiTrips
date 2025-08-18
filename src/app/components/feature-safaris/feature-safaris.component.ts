import { Component,Input } from '@angular/core';

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
}
