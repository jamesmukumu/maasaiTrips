import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Hotel, HotelsService } from '../../../../services/hotels.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'manage-destinations',
  templateUrl: './manage-destinations.component.html',
  styleUrl: './manage-destinations.component.css',
  providers:[ConfirmationService,MessageService]
})
export class ManageDestinationsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly snack = inject(MatSnackBar);

  displayedColumns: string[] = ['name', 'published',"actionPending", 'actions'];
  allowedStatus = ["pending","approved","rejected"]
  dataSource: any;
  processing = false;
  deleteDestination = false;
  showAdjuststatus = false
  updateDestination = false; 
  publishDestination = false;
  unpublishDestination = false;
  destinationAbout: any;
  idSelected: any;
status:string = ''
  getStatus(event:any){
   this.status = event.value
  }
  constructor(private msg:MessageService,private hotels: HotelsService,private confirm:ConfirmationService) {}
  destinationTitle: string = '';

  destinationDescription: any;
  Thumbnail: any;



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
      this.hotels.adjustStatus_Destinations(this.status,this.idSelected).then((data)=>{
      var {message} = data
      if(message === 'action updated'){
       this.adjusting = false
        this.snack.open("Adjusted","Success")
        this.showAdjuststatus= false
        this.fetchMyDestinations()
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
  captureDestinationAbout(event: any) {
    var { htmlValue } = event;
    this.destinationAbout = htmlValue;
  }
  captureDestinationDescription(event: any) {
    var { htmlValue } = event;
    this.destinationDescription = htmlValue;
  }

  captureThumbnail(event: any) {
    var { currentFiles } = event;
    this.Thumbnail = currentFiles[0];
  }
  chooserFile(file: any, index: number) {
    var { currentFiles } = file;
    this.images[index][`image${index + 1}`] = currentFiles[0];
  }

  async updateFuncDestination() {
    this.processing = true;
    try {
      var payload = {
        destinationTitle: this.destinationTitle ?? null,
        destinationAbout: this.destinationAbout ?? null,
        destinationDescription: this.destinationDescription ?? null,
        Thumbnail: this.Thumbnail ??  null,
        images: this.images ?? null,
      };
      var { message } = await this.hotels.updateDestination(payload,this.idSelected);
      if (message == 'Destination Updated') {
        this.updateDestination = false
        this.snack.open('Destination Updated 😀', 'success');
        this.fetchMyDestinations()
        this.processing = false;
       
      } else {
        this.updateDestination = false
        this.snack.open(message, 'Failed');
        this.processing = false;
      }
    } catch (err) {
      console.error(err);
    }
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async actualizedeleteDestination() {
    this.publishDestination = false;
    this.processing = true;
    try {
      var { message } = await this.hotels.deleteDestination(
        this.idSelected
      );
      if (message == 'Deleted') {
        this.snack.open('Deleted 😀', 'Success');
        this.fetchMyDestinations();
      } else {
        this.snack.open('Something went wrong', 'Failed');
        this.processing = false;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async actualizeUn_publishDestination() {
    this.unpublishDestination = false;
    this.processing = true;
    try {
      var { message } = await this.hotels.un_publishDestination(
        this.idSelected
      );
      if (message == 'Updated') {
        this.snack.open('Updated 😀', 'Success');
        this.fetchMyDestinations();
      } else {
        this.snack.open('Something went wrong', 'Failed');
        this.processing = false;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async actualizepublishDestination() {
    this.deleteDestination = false;
    this.processing = true;
    try {
      var { message } = await this.hotels.publishDestination(
        this.idSelected
      );
      if (message == 'Updated') {
        this.snack.open('Updated 😀', 'Success');
        this.fetchMyDestinations();
      } else {
        this.snack.open('Something went wrong', 'Failed');
        this.processing = false;
      }
    } catch (err) {
      console.error(err);
    }
  }
  async fetchMyDestinations() {
    this.processing = true;
    try {
      var { data, message } = await this.hotels.fetchMyDestinations();
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.processing = false;
    } catch (err) {
      console.error(err);
    }
  }
  popUpdate(id: any, data: any) {
  this.destinationTitle = data.destinationTitle
  this.idSelected = id
  this.destinationAbout = data.destinationAbout
  this.destinationDescription = data.destinationDescription
  this.updateDestination = true;
  }
  popDeleteDestination(id: any) {
    this.idSelected = id;
    this.deleteDestination = true;
  }
  popPublish(id: any) {
    this.idSelected = id;
    this.publishDestination = true;
  }

  popUn_Publish(id: any) {
    this.idSelected = id;
    this.unpublishDestination = true;
  }
  ngOnInit() {
    this.fetchMyDestinations();
  }
}
