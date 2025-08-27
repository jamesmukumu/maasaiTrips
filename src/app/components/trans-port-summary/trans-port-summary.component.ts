import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-trans-port-summary',
  templateUrl: './trans-port-summary.component.html',
  styleUrl: './trans-port-summary.component.css'
})
export class TransPortSummaryComponent {
@Input()summaryInformation:any

formatter(dateTime:any){
return new Date(dateTime).toLocaleDateString()
}
}
