import { Component,inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hotel,HotelsService } from '../../../../services/hotels.service';
import { RoomsService,Room } from '../../../../services/rooms.service';


@Component({
  selector: 'create-room',
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css'
})
export class CreateRoomComponent {
  readonly snack = inject(MatSnackBar)
  constructor(private room:RoomsService){}


  captureRoom(event:any){
 var {htmlValue} =  event
this.roomDescription = htmlValue
}
  images:any[] = [
  {room1:null}
  ]
  roomType:string = ''
  roomDescription = ''
bedBreakfast = ''
  halfBoard= ''
  fullBoard = ''
  allInclusive = ''
  singleRoomRateChild = 0
  doubleRoomRate = 0
  sharingRoomRate = 0
  Thumbnail:any
  roomCount = 0
  maxOccupancy = 0
  idSelected:number = 0
  contactPerson = ''
  processing = false
  destinationsData:any[] = []
  Destinations:any
  fetchingDestinations = false
  
  
 chooserFile(file:any,index:number){
  var {currentFiles} = file
  this.images[index][`room${index+1}`] = currentFiles[0]
  }
  
  chooser(event:any){
  console.log(event)
  }
  async createRoom(){
   this.processing = true
  try{   
 var payload:Room = {
fullBoard:this.fullBoard,
halfBoard:this.halfBoard,
allInclusive:this.allInclusive,
roomCount:this.roomCount,
roomDescription:this.roomDescription,
roomType:this.roomType,
sharingRoomRateChildParent:this.sharingRoomRate,
singleRoomRateChild:this.singleRoomRateChild,
doubleRoomRateChild:this.doubleRoomRate,
maximumRoomOccupancy:this.maxOccupancy,
bedBreakfast:this.bedBreakfast,
hotel_models_id:this.idSelected,
images:this.images

 }
  var {message} = await this.room.saveRoom(payload)
  if(message == 'Room Saved'){
  this.snack.open("Room Saved 😀","success")
  this.processing = false
  }else{
  this.snack.open(message,"Failed")
  this.processing = false
  }
  }catch(err){
  console.error(err)
  }
  }
 

  addImage(){
    var index = this.images.length
    this.images.push({[`room${index+1}`]:null})
    
    }
    popImage(){
      if(this.images.length <= 1){
         this.snack.open("Images cannot be less than 1","Add")
         return
      }
    this.images.pop()
    }
    
  
  async fetchHotels(){
  try{
  this.fetchingDestinations = true
  var data = await this.room.fetchHotels()
  this.destinationsData = data
  this.fetchingDestinations = false
  }catch(err){
  console.error(err)
  }
  }
  
  
  
  ngOnInit(){
    this.fetchHotels()
  }
}
