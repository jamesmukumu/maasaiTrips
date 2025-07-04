import { Component,inject,Input,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hotel,HotelsService } from '../../../../services/hotels.service';
@Component({
  selector: 'add-destinations',
  templateUrl: './add-destinations.component.html',
  styleUrl: './add-destinations.component.css'
})
export class AddDestinationsComponent  {



readonly snack = inject(MatSnackBar)


constructor(private hotels:HotelsService){}
destinationTitle:string = ''
destinationAbout = ''
destinationDescription:string = ''
Thumbnail:any
processing = false
destinationsCSV:any


getDestinationsCSV(event:any){
this.destinationsCSV = event.currentFiles[0]
}
uploadCSV(){
this.hotels.addDestinationsCSV(this.destinationsCSV).then((data)=>{
var {message} = data
if(message == 'Destinations Saved'){
this.snack.open("Destinations Saved","Success")
}else{
  
}
})
}

captureDestinationAbout(event:any){
var {args} = event
this.destinationAbout = args[0]
}
captureDestinationDescription(event:any){
var {args} = event
this.destinationDescription = args[0]
}

  
 captureThumbnail(event:any){
  var {currentFiles} = event
  this.Thumbnail = currentFiles[0]
  }
  chooserFile(file:any,index:number){
  var {currentFiles} = file
  this.images[index][`image${index+1}`] = currentFiles[0]
  }
  
  
  async saveDestination(){
  
  this.processing = true
  try{   
  var payload = {
  "destinationTitle":this.destinationTitle,
  "destinationAbout":this.destinationAbout,
  "destinationDescription":this.destinationDescription,
  "Thumbnail":this.Thumbnail,
  "images":this.images
  }
  var {message} = await this.hotels.saveDestination(payload)
  if(message == 'Destination Added'){
  this.snack.open("Destination Added 😀","success")
  this.processing = false
  }else{
  this.snack.open(message,"Failed")
  this.processing = false
  }
  }catch(err){
  console.error(err)
  }
  }

 
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
    
 
 




}
