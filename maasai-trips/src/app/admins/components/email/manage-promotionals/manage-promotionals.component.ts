import { Component,OnInit,inject,ViewChild} from '@angular/core';
import { MailServService,MailTemplate } from '../../../../services/mail/mail-serv.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MessageService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { settoPreviews } from '../../../../redux/actions/preview.action';
import { Router } from '@angular/router';
import { NewslettersService,Promotional } from '../../../../services/mail/promotional/newsletters.service';
@Component({
  selector: 'manage-promotionals',
  templateUrl: './manage-promotionals.component.html',
  styleUrl: './manage-promotionals.component.css',
  providers:[MessageService]
})
export class ManagePromotionalsComponent implements OnInit {
  readonly snack = inject(MatSnackBar)
  displayedColumns: string[] = ['createdon', 'Title', 'Content', 'actions'];
  processing = false
  dataSource:any
  idSelected:number = 0
  deleting = false
  subject =''
  updating = false
  subj = ''
  messageEdit = ''
  constructor(private router:Router,private store:Store,private mail:MailServService,private msg:MessageService,private news:NewslettersService){}
  @ViewChild(MatPaginator) paginator!:MatPaginator
  
  timeFormater(time:string){  
    return new Date(time).toString()
    }
    logger(event:any){ 
    var {htmlValue} = event
    this.messageEdit = htmlValue
    }
    
  async updatingMailer(){
  try{
  this.updating = false
  this.processing = true
  var payload:MailTemplate = {
    subject:this.subj,
    mailMessage:this.messageEdit
  }
  var {message} =  await this.mail.updateMailTemplate(payload,this.idSelected)
  if(message == 'Template Updated'){
    this.snack.open("Templated updated","UPDATED",{
      horizontalPosition:"center",
      verticalPosition:"bottom"
    })
    this.FetchMails()
  }else{
  this.msg.add({severity:"error",detail:"Something went wrong during update",life:10000})
  }
  
  
  }catch(err){
  console.log(err)
  }
  }
  
  popUpdate(subject:string,id:number,initialMsg:string){
  this.updating = true
  this.subj = subject
  this.idSelected = id
  this.messageEdit = initialMsg
  }
  
  
  
    popDelete(id:number,subject:string){
    this.deleting = true
    this.idSelected = id  
    this.subject = subject
  }
  async previewDataOther(element:any){
    try{
    
      var places = JSON.parse(element.placesVisit)
      element.Destinations = places
      var valuesDestination = Object.values(element.Destinations)
     var keysDestinations = Object.keys(places)
     var emptyDestination:any = []
     console.log(element.Destinations)
     console.log(keysDestinations)
     for(let i = 0; i < element.Destinations.length;i++){
    var destinationMap = {
  [`${keysDestinations[i]}${i}`]:valuesDestination[i]
 
    }
    emptyDestination = [...emptyDestination,destinationMap]
     }
console.log(emptyDestination)
return

      var refinedElement:Promotional = element
      console.log(refinedElement)
      
      var data = await this.news.previewPromotionalNewsletterEditor(refinedElement)
  
        this.store.dispatch(settoPreviews({previewData:data}))
        return
        const url = this.router.createUrlTree(['/preview'], { 
          queryParams: { previewMode: 'AlertNewsLetters' } 
        }).toString();
        
        window.open(url, '_blank');
    }catch(err){
console.error(err)
    }
  }
  async delete(){
  this.processing = true
  this.deleting = false
  try{
  var {message} = await this.mail.deleteTemplate(this.idSelected)
  if(message == 'Deleted'){
  this.snack.open("Delete","success".toUpperCase(),{
  horizontalPosition:"center",
  verticalPosition:"bottom"
  })
  this.FetchMails()
  }else{
  this.msg.add({severity:"error",detail:"Somethin went wrong",life:10000})
  }
  }catch(err){
  console.error(err)
  }
  
  }
    async FetchMails(){
    this.processing = true
    try{
    var {message,data} =await this.news.fetchPromotionalNewsletters()
    this.dataSource = new MatTableDataSource(data)
    this.dataSource.paginator = this.paginator
    this.processing = false
    }catch(err){
    console.error(err)
    }
    }
    ngOnInit(){
    this.FetchMails()
    }
  
}
