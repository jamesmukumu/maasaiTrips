import { Component,OnInit,ViewChild,inject } from '@angular/core';
import { Hotel,HotelsService } from '../../../../services/hotels.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'manage-hotels',
  templateUrl: './manage-hotels.component.html',
  styleUrl: './manage-hotels.component.css'
})
export class ManageHotelsComponent {
@ViewChild(MatPaginator) paginator!:MatPaginator

constructor(private hotel:HotelsService){}
hotelData:any
popEditor = false
hotelNameDelete = ''
idSelected:number = 0
fetchingHotels = false
publishing = false
deleteHotel = false
displayedColumns:string[] = ["hotelName","contactPerson","destination","phoneNumber","contactEmail","commission","maxRate","minRate","published","actions"]
displayedColumnsSmall:string[] = ["hotelName","destination","published","actions"]
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.hotelData.filter = filterValue.trim().toLowerCase();
}
deletingHotel(element:any){
this.hotelNameDelete = element.hotelName
this.idSelected = element.id
this.deleteHotel = true
}
editHotel(element:any){
this.idSelected = element.id
this.popEditor = true
}
publishingHotel(element:any){
  this.hotelNameDelete = element.hotelName
  this.idSelected = element.id
  this.publishing = true
  }

async fetchHotels(){
try{
this.fetchingHotels = true
var {data} = await this.hotel.findMyHotels()
this.hotelData = new MatTableDataSource(data)
this.hotelData.paginator  = this.paginator
this.fetchingHotels = false
}catch(err){
console.error(err)
}

}




hotelName:string = ''
hotelDescription = ''
hotelMetaDescription = ''
cancellationPolicy = ''
locationDescription = ''
hotelCommission = 0
maximumRoomRate = 0
minimumRoomRate = 0
Thumbnail:any
contactEmail = ''
phoneNumber = ''
contactPerson = ''
processing = false
destinationsData:any[] = []
Destinations:any
fetchingDestinations = false


captureDescriptionHotel(event:any){
var {htmlValue} = event
this.hotelDescription = htmlValue
}

captureMetaDescriptionHotel(event:any){ 
var {htmlValue} = event
this.hotelMetaDescription = htmlValue
}
captureCancellationPolicyHotel(event:any){
var {htmlValue} = event
this.cancellationPolicy = htmlValue
}
captureLocationHotel(event:any){
var {htmlValue} = event
this.locationDescription = htmlValue
}

captureThumbnail(event:any){
var {currentFiles} = event
this.Thumbnail = currentFiles[0]
}
chooserFile(file:any,index:number){
var {currentFiles} = file
this.images[index][`image${index+1}`] = currentFiles[0]
}

chooser(event:any){
console.log(event)
}

async updateHotel(){
this.processing = true
try{   
var payload:Hotel = {
  hotelName:this.hotelName,
  hotelCancellationPolicy:this.cancellationPolicy,
  hotelCommission:this.hotelCommission,
  hotelDescription:this.hotelDescription,
  hotelMetaDescription:this.hotelMetaDescription,
  thumbnail:this.Thumbnail,
  destinations_id:this.Destinations,
  images:this.images,
  maximumRate:this.maximumRoomRate,
   minimumRoomRate:this.minimumRoomRate,
   contactEmail:this.contactEmail,
   contactPerson:this.contactPerson,
   contactPhoneNumber:this.contactPerson,
   locationDescription:this.locationDescription
}
var {message} = await this.hotel.updateHotel(payload,this.idSelected)
if(message == 'update Saved'){
this.snack.open("Hotel Updated 😀","success")
this.processing = false
}else{
this.snack.open(message,"Failed")
this.processing = false
}
}catch(err){
console.error(err)
}
}
readonly snack = inject(MatSnackBar)
availableContactPerson:string[] = ["Manager","Reservationist","HR Manager"]
images:any[] = [
{image1:null}
]
addImage(){
  var index = this.images.length
  this.images.push({[`image${index+1}`]:null})
  
  }
  popImage(){
    if(this.images.length <= 1){
       this.snack.open("Images cannot be less than 1","Add")
       return
    }
  this.images.pop()
  }
  

async fetchDestinations(){
try{
this.fetchingHotels = true
var data = await this.hotel.fetchDestinations()
this.destinationsData = data
this.fetchingHotels = false
}catch(err){
console.error(err)
}
}



async deleteHotelPermanently(){
try{
this.fetchingHotels = true
this.deleteHotel = false
var {message} = await this.hotel.deleteHotel(this.idSelected)
if(message == 'Deleted'){
this.fetchingHotels = false
this.snack.open("Deleted 😃","success")
this.fetchHotels()
}else{
this.snack.open("Something Went Wrong 😞","Failed")
}
}catch(err){
console.error(err)
this.fetchingHotels = false
}
}


async completePublish(){
this.fetchingHotels = true
this.publishing = false
try{
var {message,Content} = await this.hotel.publishHotel(this.idSelected)
if(message == 'Rejected'){

this.snack.open(Content+" "+"❌","Add Rooms")
this.fetchingHotels = false
}else if(message == 'updated'){
this.snack.open("Published 😃 ","success")
this.fetchDestinations()
}else{
this.snack.open("Something Went Wrong 😞","Failed")
this.fetchingHotels = false
}
}catch(err){
console.log(err)
this.fetchingHotels = true
}

}







ngOnInit(){
this.fetchHotels()
this.fetchDestinations()
}
}
