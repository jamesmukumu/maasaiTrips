import { Component,OnInit,ViewChild,inject } from '@angular/core';
import { Hotel,HotelsService } from '../../../../services/hotels.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PackagesService } from '../../../../services/packages.service';


@Component({
  selector: 'manage-packages',
  templateUrl: './manage-packages.component.html',
  styleUrl: './manage-packages.component.css'
})
export class ManagePackagesComponent {
  @ViewChild(MatPaginator) paginator!:MatPaginator
  readonly snack = inject(MatSnackBar)
constructor(private destination:HotelsService,private packages:PackagesService){}
  displayedColumns:string[] = ["name","charge","startDate","endDate","published","actions"]
  displayedColumnsSmall:string[] = ["name","charge","published","actions"]
  dataSource:any
  processing = false
  deleteDestination = false
  updateDestination = false
  publishDestination = false
  unpublishDestination = false
  idSelected:any
  dataSourceSmall:any
  
formatDate(dateTime:any){
return new Date(dateTime).toDateString()
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }    


  async actualizedeleteDestination(){
    this.publishDestination = false
    this.processing = true
   try{
  var {message} = await this.packages.deletePackage(this.idSelected)
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
  var {message} = await this.packages.un_publishPackage(this.idSelected)
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
  var {message} = await this.packages.publishPackage(this.idSelected)
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
var {data,message} = await this.packages.fetchMyPackages()
this.dataSource = new MatTableDataSource(data)
this.dataSourceSmall = new MatTableDataSource(data)
this.dataSource.paginator = this.paginator
this.dataSourceSmall.paginator = this.paginator
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
