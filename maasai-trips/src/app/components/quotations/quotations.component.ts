import { Component } from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
@Component({
  selector: 'quotations',
  templateUrl: './quotations.component.html',
  styleUrl: './quotations.component.css',
  providers:[provideNativeDateAdapter()]
})
export class QuotationsComponent {

}
