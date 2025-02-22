import { Component,OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MailServService } from '../../../../services/mail/mail-serv.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'queue',
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.css'
})
export class QueueComponent {
@ViewChild(MatPaginator) paginator!:MatPaginator
constructor(private mail:MailServService){}
dataSource:any
processing = false
displayedColumns = ["created","mail","name","status","action"]

timeFormater(time:string){
return new Date(time).toString()
}

async FetchStatuses(){
this.processing = true
try{
var {message,data} =await this.mail.fetchStatus()
this.dataSource = new MatTableDataSource(data)
this.dataSource.paginator = this.paginator
this.processing = false
}catch(err){
console.error(err)
}
}
ngOnInit(){
this.FetchStatuses()
}



}
