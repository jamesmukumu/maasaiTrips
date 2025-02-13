import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'bulk-mails',
  templateUrl: './bulk-mails.component.html',
  styleUrl: './bulk-mails.component.css'
})
export class BulkMailsComponent  {
bulkOptions:string[] = ["Hotel","client","Client local","Administrator"]
fullName:string = ''
 

}
