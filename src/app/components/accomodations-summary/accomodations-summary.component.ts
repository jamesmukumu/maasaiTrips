import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-accomodations-summary',
  templateUrl: './accomodations-summary.component.html',
  styleUrl: './accomodations-summary.component.css'
})
export class AccomodationsSummaryComponent {
  @Input()summaryInformation:any

  formatter(dateTime:any){
  return new Date(dateTime).toLocaleDateString()
  }
}
