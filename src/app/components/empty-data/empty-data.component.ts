import { Component,Input } from '@angular/core';

@Component({
  selector: 'empty-data',
  templateUrl: './empty-data.component.html',
  styleUrl: './empty-data.component.css'
})
export class EmptyDataComponent {
@Input() emptyMesage:any
@Input() emptyDescription:any




}
