import { Component,OnInit,ViewChild,inject } from '@angular/core';
import { Hotel,HotelsService } from '../../../../services/hotels.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'manage-destinations',  
  templateUrl: './manage-destinations.component.html',
  styleUrl: './manage-destinations.component.css'
})
export class ManageDestinationsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!:MatPaginator
  readonly snack = inject(MatSnackBar)
constructor(private destination:HotelsService){}
  displayedColumns:string[] = ["name","published","actions"]
  dataSource:any
  processing = false
  deleteDestination = false
  updateDestination = false
  publishDestination = false
  unpublishDestination = false
  idSelected:any
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }    


  async actualizedeleteDestination(){
    this.publishDestination = false
    this.processing = true
   try{
  var {message} = await this.destination.deleteDestination(this.idSelected)
  if(message == 'Deleted'){
  this.snack.open("Deleted 😀","Success")
  this.fetchMyDestinations()
  }else{
  this.snack.open("Something went wrong","Failed")
  this.processing = false
  }
   }catch(err){
   console.error(err)
  }
  }

  async actualizeUn_publishDestination(){
    this.unpublishDestination = false
    this.processing = true
   try{
  var {message} = await this.destination.un_publishDestination(this.idSelected)
  if(message == 'Updated'){
  this.snack.open("Updated 😀","Success")
  this.fetchMyDestinations()
  }else{
  this.snack.open("Something went wrong","Failed")
  this.processing = false
  }
   }catch(err){
   console.error(err)
  }
  }


  async actualizepublishDestination(){
    this.deleteDestination = false
    this.processing = true
   try{
  var {message} = await this.destination.publishDestination(this.idSelected)
  if(message == 'Updated'){
  this.snack.open("Updated 😀","Success")
  this.fetchMyDestinations()
  }else{
  this.snack.open("Something went wrong","Failed")
  this.processing = false
  }
   }catch(err){
   console.error(err)
  }
  }
async fetchMyDestinations(){
this.processing = true
try{
var {data,message} = await this.destination.fetchMyDestinations()
this.dataSource = new MatTableDataSource(data)
this.dataSource.paginator = this.paginator
this.processing = false
}catch(err){
console.error(err)
}

}
popUpdate(id:any){
this.updateDestination = true
}
popDeleteDestination(id:any){
this.idSelected = id
this.deleteDestination = true

}
popPublish(id:any){
  this.idSelected = id
this.publishDestination = true
}

popUn_Publish(id:any){
  this.idSelected = id
this.unpublishDestination = true
}
ngOnInit(){
this.fetchMyDestinations()
}
}
