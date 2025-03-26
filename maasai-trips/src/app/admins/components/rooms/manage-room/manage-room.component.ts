
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Hotel, HotelsService } from '../../../../services/hotels.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RoomsService,Room } from '../../../../services/rooms.service';
import { MessageService,ConfirmationService } from 'primeng/api';
import { Store } from '@ngrx/store';

@Component({
  selector: 'manage-room',
  templateUrl: './manage-room.component.html',
  styleUrl: './manage-room.component.css',
  providers:[ConfirmationService,MessageService]
})
export class ManageRoomComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly dialog = inject(MatDialog)
    constructor(private store:Store,private hotel: HotelsService,private room:RoomsService,private msg:MessageService,private confirm:ConfirmationService) {}
    hotelData: any;
    popEditor = false;
    adminShow = false
    hotelNameDelete = '';
    idSelected: number = 0;
    hotelRelevantData:any
    latitude:any
    longitude:any
    fetchingHotels = false;
    publishing = false;
    deleteHotel = false;
    adjustStatus(id:any){
      this.idSelected = id
    this.showAdjuststatus = true
    }    
  adjusting = false
    popConfirm(event:any){
    this.confirm.confirm({
      target:event?.target as EventTarget,
      message:"Are you ready to change the status",
      accept:()=>{
        this.adjusting = true
        this.room.adjustStatus_Rooms(this.status,this.idSelected).then((data)=>{
        var {message} = data
        if(message === 'action updated'){
         this.adjusting = false
          this.snack.open("Adjusted","Success")
          this.showAdjuststatus= false
          this.fetchDestinations()
        }else if(message == 'Unauthorized function'){
          this.adjusting = false
          this.showAdjuststatus = false
          this.msg.add({life:13000,severity:"error",detail:'You cannot Perform this function'})
        }
  
        })
  
  
      },
      reject:()=>{}
    })
    }
    showAdjuststatus = false
    allowedStatus = ["pending","approved","rejected"]
    status:string = ''
    getStatus(event:any){
     this.status = event.value
    }
    displayedColumns: string[] = [
      'roomType',
      'hotelName',  
      'fullBoard',
      'allInclusive',
      'halfBoard',
      'singleRoomRateChild',
      'doubleRoomRateChild',
      'roomCount',
      'maximumRoomOccupancy',
      "actionPending",
    
      'actions',
    ];
    displayedColumnsSmall: string[] = [
      'roomType',
      'hotelName',
  
      'roomCount',
     
    
      'actions',
    ];

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
   
    contactPerson = ''
    processing = false
    destinationsData:any[] = []
    Destinations:any
    fetchingDestinations = false



    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.hotelData.filter = filterValue.trim().toLowerCase();
    }
    deletingHotel(element: any) {
      this.hotelNameDelete = element.hotelName;
      this.idSelected = element.id;
      this.deleteHotel = true;
    }
    editHotel(element: any) {
      this.idSelected = element.id;
      this.roomType = element.roomType
      this.maxOccupancy = element.maximumRoomOccupancy
      this.roomCount = element.roomCount
      this.allInclusive = element.allInclusive
      this.fullBoard = element.fullBoard
      this.halfBoard = element.halfBoard

      this.singleRoomRateChild = element.singleRoomRateChild
      this.bedBreakfast = element.bedBreakfast
   
      
      this.popEditor = true;
    }
    publishingHotel(element: any) {
      this.hotelNameDelete = element.hotelName;
      this.idSelected = element.id;
      this.publishing = true;
    }
  
    async fetchHotels() {
      try {
        this.fetchingHotels = true;
        var { data } = await this.hotel.findMyRooms();
        this.hotelData = new MatTableDataSource(data);
        this.hotelData.paginator = this.paginator;
        this.fetchingHotels = false;
      } catch (err) {
        console.error(err);
      }
    }

    async fetch_Hotels(){
      try{
      this.fetchingDestinations = true
      var data = await this.room.fetchHotels()
      this.hotelRelevantData = data
      this.fetchingDestinations = false
      }catch(err){
      console.error(err)
      }
      }
  
    hotelName: string = '';
    hotelDescription = '';
    hotelMetaDescription = '';
    cancellationPolicy = '';
    locationDescription = '';
    hotelCommission = 0;
    maximumRoomRate = 0;
    minimumRoomRate = 0;

    contactEmail = '';
    phoneNumber = '';
   
  
    captureDescriptionHotel(event: any) {
      var { htmlValue } = event;
      this.hotelDescription = htmlValue;
    }
  
    captureMetaDescriptionHotel(event: any) {
      var { htmlValue } = event;
      this.hotelMetaDescription = htmlValue;
    }
    captureCancellationPolicyHotel(event: any) {
      var { htmlValue } = event;
      this.cancellationPolicy = htmlValue;
    }
    captureLocationHotel(event: any) {
      var { htmlValue } = event;
      this.locationDescription = htmlValue;
    }
  
    captureThumbnail(event: any) {
      var { currentFiles } = event;
      this.Thumbnail = currentFiles[0];
    }
    chooserFile(file: any, index: number) {
      var { currentFiles } = file;
      this.images[index][`image${index + 1}`] = currentFiles[0];
    }
  
   
  

    readonly snack = inject(MatSnackBar);
    availableContactPerson: string[] = [
      'Manager',
      'Reservationist',
      'HR Manager',
    ];
    
    
      captureRoom(event:any){
        var {htmlValue} =  event
       this.roomDescription = htmlValue
       }
    images: any[] = [{ image1: null }];
    addImage() {
      var index = this.images.length;
      this.images.push({ [`image${index + 1}`]: null });
    }
    popImage() {
      if (this.images.length <= 1) {
        this.snack.open('Images cannot be less than 1', 'Add');
        return;
      }
      this.images.pop();
    }
    getHotel(event:any){
this.hotelid = event.value.id
    }
      hotelid:any

    async updateRoom(){
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
     var {message} = await this.room.updateRoom(payload,this.idSelected)
     if(message == 'Room Updated Successfully'){
      this.popEditor = false
     this.snack.open("Room Updated 😀","success")
     this.processing = false
     }else{
      this.popEditor = false
     this.snack.open(message,"Failed")
     this.processing = false

     }
     }catch(err){
     console.error(err)
     }
     }







    async fetchDestinations() {
      try {
        this.fetchingHotels = true;
        var data = await this.hotel.fetchDestinations();
        this.destinationsData = data;
        this.fetchingHotels = false;
      } catch (err) {
        console.error(err);
      }
    }
  
    async deleteHotelPermanently() {
      try {
        this.fetchingHotels = true;
        this.deleteHotel = false;
        var { message } = await this.hotel.deleteHotel(this.idSelected);
        if (message == 'Deleted') {
          this.fetchingHotels = false;
          this.snack.open('Deleted 😃', 'success');
          this.fetchHotels();
        } else {
          this.snack.open('Something Went Wrong 😞', 'Failed');
        }
      } catch (err) {
        console.error(err);
        this.fetchingHotels = false;
      }
    }
  
    async completePublish() {
      this.fetchingHotels = true;
      this.publishing = false;
      try {
        var { message, Content } = await this.hotel.publishHotel(this.idSelected);
        if (message == 'Rejected') {
          this.snack.open(Content + ' ' + '❌', 'Add Rooms');
          this.fetchingHotels = false;
        } else if (message == 'updated') {
          this.snack.open('Published 😃 ', 'success');
          this.fetchDestinations();
        } else {
          this.snack.open('Something Went Wrong 😞', 'Failed');
          this.fetchingHotels = false;
        }
      } catch (err) {
        console.log(err);
        this.fetchingHotels = true;
      }
    }
  
    ngOnInit() {
      this.store.subscribe((data:any)=>{
        var {statusAdmin} = data
        this.adminShow = statusAdmin
      })
      this.fetchHotels();
       this.fetch_Hotels()
    }
}