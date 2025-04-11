import { Component,inject,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hotel,HotelsService } from '../../../../services/hotels.service';
@Component({
  selector: 'create-hotels',
  templateUrl: './create-hotels.component.html',
  styleUrl: './create-hotels.component.css'
})
export class CreateHotelsComponent {
constructor(private hotels:HotelsService){}

hotelName:string = ''
hotelDescription = ''
hotelMetaDescription = ''
cancellationPolicy = ''
locationDescription = ''
hotelCommission = 0
maximumRoomRate = 0
minimumRoomRate = 0
hotelLongitude = 0
hotelLatitude = 0
Thumbnail:any
contactEmail = ''
phoneNumber = ''
contactPerson = ''
processing = false
destinationsData:any[] = []
Destinations:any
fetchingDestinations = false


captureDescriptionHotel(event:any){
var {args} = event
this.hotelDescription = args[0]
}

captureMetaDescriptionHotel(event:any){ 
var {args} = event
this.hotelMetaDescription = args[0]
}
captureCancellationPolicyHotel(event:any){
var {args} = event
this.cancellationPolicy = args[0]
}
captureLocationHotel(event:any){
var {args} = event
this.locationDescription = args[0]
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
async saveHotel(){

this.processing = true
try{   
var payload = {
  hotelName:this.hotelName,
  hotelCancellationPolicy:this.cancellationPolicy,
  hotelCommission:this.hotelCommission,
  hotelDescription:this.hotelDescription,
  hotelMetaDescription:this.hotelMetaDescription,
  thumbnail:this.Thumbnail,
  latitude:this.hotelLatitude,
  longitude:this.hotelLongitude,
  destinations_id:this.Destinations,
  images:this.images,
  maximumRate:this.maximumRoomRate,
   minimumRoomRate:this.minimumRoomRate,
   contactEmail:this.contactEmail,
   contactPerson:this.contactPerson,
   contactPhoneNumber:this.phoneNumber,
   locationDescription:this.locationDescription
}

var {message} = await this.hotels.saveHotel(payload)
if(message == 'Hotel Saved'){
this.snack.open("Hotel Saved 😀","success")
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
this.fetchingDestinations = true
var data = await this.hotels.fetchDestinations()
this.destinationsData = data
this.fetchingDestinations = false
}catch(err){
console.error(err)
}
}



ngOnInit(){
  this.fetchDestinations()
}
}
 