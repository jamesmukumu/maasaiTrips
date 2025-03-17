import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Hotel, HotelsService } from '../../../../services/hotels.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MessageService,ConfirmationService } from 'primeng/api';
@Component({
  selector: 'manage-hotels',
  templateUrl: './manage-hotels.component.html',
  styleUrl: './manage-hotels.component.css',
  providers:[MessageService,ConfirmationService]
})
export class ManageHotelsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
readonly dialog = inject(MatDialog)
  constructor(private hotel: HotelsService,private msg:MessageService,private confirm:ConfirmationService) {}
  hotelData: any;
  popEditor = false;
  hotelNameDelete = '';
  idSelected: number = 0;
  latitude:any
  longitude:any
  fetchingHotels = false;
  publishing = false;
  deleteHotel = false;
  getStatus(event:any){
    this.status = event.value
   }
  allowedStatus = ["pending","approved","rejected"]
  displayedColumns: string[] = [
    'hotelName',
    'contactPerson',
    'destination',
    'phoneNumber',
    'contactEmail',
    'commission',
    'maxRate',
    'minRate',
    'published',
    "actionPending",
    'actions',
  ];
  displayedColumnsSmall: string[] = [
    'hotelName',
    'destination',
    'published',
    'actions',
  ];
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
    this.hotelName = element.hotelName;
    this.latitude = element.latitude
    this.longitude = element.longitude
    this.hotelDescription = element.hotelDescription
    this.hotelMetaDescription = element.hotelMetaDescription
    this.hotelCommission = element.hotelCommission
    this.minimumRoomRate = element.minimumRoomRate
    this.maximumRoomRate = element.maximumRate
    this.contactEmail = element.contactEmail
    this.phoneNumber = element.contactPhoneNumber
    this.Destinations = element.destinations_id
    this.locationDescription = element.locationDescription
    this.cancellationPolicy = element.hotelCancellationPolicy
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
      var { data } = await this.hotel.findMyHotels();
      this.hotelData = new MatTableDataSource(data);
      this.hotelData.paginator = this.paginator;
      this.fetchingHotels = false;
    } catch (err) {
      console.error(err);
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
  Thumbnail: any;
  contactEmail = '';
  phoneNumber = '';
  contactPerson = '';
  processing = false;
  destinationsData: any[] = [];
  Destinations: any;
  fetchingDestinations = false;
showAdjuststatus = false
status = ''
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
      this.hotel.adjustStatus_Hotels(this.status,this.idSelected).then((data)=>{
      var {message} = data
      if(message === 'action updated'){
       this.adjusting = false
        this.snack.open("Adjusted","Success")
        this.showAdjuststatus= false
        this.fetchHotels()
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

 

  async updateHotel() {
    this.processing = true;
    try {
      var payload: any = {
        hotelName: this.hotelName,
        hotelCancellationPolicy: this.cancellationPolicy,
        hotelCommission: this.hotelCommission,
        hotelDescription: this.hotelDescription,
        hotelMetaDescription: this.hotelMetaDescription,
        thumbnail: this.Thumbnail,
        destinations_id: this.Destinations,
        images: this.images,
        maximumRate: this.maximumRoomRate,
        minimumRoomRate: this.minimumRoomRate,
        contactEmail: this.contactEmail,
        contactPerson: this.contactPerson,
        contactPhoneNumber: this.phoneNumber,
        locationDescription: this.locationDescription,
      };
      var { message } = await this.hotel.updateHotel(payload, this.idSelected);
      if (message == 'Hotel Updated') {
        this.popEditor = false
        this.snack.open('Hotel Updated 😀', 'success');
        this.processing = false;
     
      } else {
        this.snack.open(message, 'Failed');
        this.processing = false;
        this.popEditor = false
      }
    } catch (err) {
      console.error(err);
    }
  }

getDestination(event:any){

this.Destinations = event.value.id
}

getContact(event:any){
this.contactPerson = event.value
}
  readonly snack = inject(MatSnackBar);
  availableContactPerson: string[] = [
    'Manager',
   "Reservation",
   "Hotelier"
  ];
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
    this.fetchHotels();
    this.fetchDestinations();
  }
}
