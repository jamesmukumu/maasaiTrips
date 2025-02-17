import { Component,OnInit,ViewChild,AfterViewInit,inject } from '@angular/core';
import { MailServService } from '../../../../services/mail/mail-serv.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewBulkAddComponent } from '../new-bulk-add/new-bulk-add.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'bulk-mails',
  templateUrl: './bulk-mails.component.html',
  styleUrl: './bulk-mails.component.css'
})
export class BulkMailsComponent implements OnInit,AfterViewInit  {
@ViewChild(MatPaginator) paginator!:MatPaginator
readonly dialog = inject(MatDialog)

openBulk(){
this.dialog.open(NewBulkAddComponent)
}


dataSource:any
displayedColumns:string[] = ["choosen","fullname","category","identificationNumber","email","country","action"]
processingTable = false
constructor(private mailer:MailServService){}


applyFilter(event:Event){
const filterValue = (event.target as HTMLInputElement).value;
this.dataSource.filter = filterValue.trim().toLowerCase();
}


fetchBulkMails(){
this.processingTable = true
this.mailer.fetchBulks("http://localhost:8000/api/fetch/bulk/emails").then((dataa)=>{
var {message,data,currentPage,nextPage} = dataa
this.dataSource = new MatTableDataSource(data)
this.dataSource.paginator = this.paginator
this.processingTable = false
})
}
ngAfterViewInit(){

  this.dataSource.paginator = this.paginator 
}

ngOnInit(){
this.fetchBulkMails()
}
fullName:string = ''



}
