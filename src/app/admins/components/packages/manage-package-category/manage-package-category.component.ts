import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Hotel, HotelsService } from '../../../../services/hotels.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PackagesService } from '../../../../services/packages.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { MessageService,ConfirmationService } from 'primeng/api';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-manage-package-category',
  templateUrl: './manage-package-category.component.html',
  styleUrl: './manage-package-category.component.css',
  providers:[provideNativeDateAdapter(),MessageService,ConfirmationService]
})
export class ManagePackageCategoryComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly snack = inject(MatSnackBar);
  constructor(
    private store:Store,
    private hotels: HotelsService,
    private packages: PackagesService,
    private msg:MessageService,
    private confirm:ConfirmationService
  ) {}
  adjustStatus(id:any){
    this.idSelected = id
  this.showAdjuststatus = true
  }    
adminStatus = false
adjusting = false
  popConfirm(event:any){
  this.confirm.confirm({
    target:event?.target as EventTarget,
    message:"Are you ready to change the status",
    accept:()=>{
      this.adjusting = true
      this.packages.adjustStatus_Packages(this.status,this.idSelected).then((data)=>{
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
  showAdjuststatus = false
  allowedStatus = ["pending","approved","rejected"]
  status:string = ''
  getStatus(event:any){
   this.status = event.value
  }
  displayedColumns: string[] = [
    'title',
 
    'startDate',
   
    'actions',
  ];
  displayedColumnsSmall: string[] = ['title','startDate','actions'];
  dataSource: any;
  processing = false;
  deleteDestination = false;
  updateDestination = false;
  publishDestination = false;
  unpublishDestination = false;
  idSelected: any;
  dataSourceSmall: any;
  packageDataPresent = false

  formatDate(dateTime: any) {
    return new Date(dateTime).toDateString();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async actualizedeleteDestination() {
    this.publishDestination = false;
    this.processing = true;
    try {
      var { message } = await this.packages.deletePackage(this.idSelected);
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
      var { message } = await this.packages.un_publishPackage(this.idSelected);
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
      var { message } = await this.packages.publishPackage(this.idSelected);
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
      var { data, message } = await this.packages.fetchPackageCategories();
      if(data.length == 0){
      this.processing = false
      this.packageDataPresent = false
      }else{
        this.dataSource = new MatTableDataSource(data);
        this.dataSourceSmall = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSourceSmall.paginator = this.paginator;
        this.processing = false;
        this.packageDataPresent = true
      }
   
    } catch (err) {
      console.error(err);
    }
  }
  ordinaryUpdate = false
  addDay(){
  this.packageAbout.push({
  title:"",
  description:""
  })
  }
  removeDay(){
    this.packageAbout.pop()
    }
  popUpdate(title:any) {
 this.packageTitle = title   
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

  images: any[] = [{ image1: null }];
  targetDestination: any;
  targetCategory: any;
  choosenBudgetType: any;
  choosenMeans: any;
  destinationsData: any[] = [];
  packageCategories: any[] = [];
  Destinations: any;
  budgetTypes = ['Mid Range Tour', 'Luxury Tour', 'Private Tour'];
  transport = ['Air', 'LandCruiser', 'Van', 'Jeep'];
  fetchingDestinations = false;
  specialNotes: any;
  newPackageCategory: string = '';

  async fetchDestinations() {
    try {
      var data = await this.hotels.fetchDestinations();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async fetchPackageCatagories() {
    try {
      var data = await this.packages.fetchPackageCategories();
      return data.data;
    } catch (err) {
      console.error(err);
    }
  }

  async ngOnInit() {
    this.store.subscribe((data:any)=>{
      var {statusAdmin} = data
      this.adminStatus = statusAdmin
    })
    try {
      this.fetchingDestinations = true;
      this.fetchMyDestinations();
      var data = await Promise.all([
        this.fetchDestinations(),
        this.fetchPackageCatagories(),
      ]);
      this.destinationsData = data[0];
      this.packageCategories = data[1];
      this.addPackageCategory = true;
      this.fetchingDestinations = false;
    } catch (err) {
      this.fetchingDestinations = false;
      console.error(err);
    }
  }

  chooserFile(file: any, index: number) {
    var { currentFiles } = file;
    this.images[index][`image${index + 1}`] = currentFiles[0];
  }
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

  baseFlag = 'https://flagcdn.com/16x12/';
  newCountryCodes: any[] = [];
  inclusions: string[] = [];
  exclusions: string[] = [];

  packageTitle: any;
  packageOverview: any;
  packageAbout: any;
  startDate: any;
  endDate: any;
  packageCharge = 0;
  packagePhoto: any;
  addPackageCategory = false;
  captureOverview(event: any) {
    var { htmlValue } = event;
    this.packageOverview = htmlValue;
  }

  chooser(event: any) {
    var { currentFiles } = event;
    this.packagePhoto = currentFiles[0];
  }
  seeStartDate(event: any) {
    var { value } = event;
    this.startDate = new Date(value).toString();
  }
  endDateFormat(event: any) {
    var { value } = event;
    this.endDate = new Date(value).toString();
  }

  captureAbout(event: any) {
    var { htmlValue } = event;
    this.packageAbout = htmlValue;
  }

  captureSpecialNotes(event: any) {
    var { htmlValue } = event;
    this.specialNotes = htmlValue;
  }
  getCurrency(event: any) {
    var { value } = event;
    this.codeValues = value.code;
  }
  getTransport(event: any) {
    var { value } = event;
    this.choosenMeans = value;
  }
  getBudget(event: any) {
    var { value } = event;
    this.choosenBudgetType = value;
  }
  getPackageCategory(event: any) {
    var { value } = event;
    this.targetCategory = value.title;
  }

  getDestination(event: any) {
    var { value } = event;
    this.targetDestination = value;
   
  }

  async updatePackages() {
    let incl = JSON.stringify(this.inclusions);
    let excl = JSON.stringify(this.exclusions);

    try {
      this.processing = true;
      var payload = {
        title: this.packageTitle,
        about: this.packageAbout,
        overview: this.packageOverview,
        image: this.packagePhoto,
        charges: this.packageCharge,
        startDate: this.startDate,
        endDate: this.endDate,
        chargeCurrency: this.codeValues,
        images: this.images,
        destinations_id: this.targetDestination,
        package_categories_id: this.targetCategory,
        mode_transport: this.choosenMeans,
        budgetType: this.choosenBudgetType,
        packageInclusives: incl,
        packageExclusives: excl,
        specialNotes: this.specialNotes,
      };
      var { message, content } = await this.packages.updatePackage(
        payload,
        this.idSelected
      );
      if (message == 'package Updated') {
        this.processing = false;
        this.updateDestination = false
        this.snack.open('Package Updated 😄', 'success'.toUpperCase());
        this.fetchMyDestinations();
      } else {
        this.processing = false;
        this.updateDestination = false
        this.snack.open('Something Went Wrong', 'Try again');
      }
    } catch (err) {
      this.processing = false;
    }
  }

  addInclusions(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.inclusions.push(value);
    }
    event.chipInput!.clear();
  }

  removeInclusions(chip: string): void {
    const index = this.inclusions.indexOf(chip);
    if (index >= 0) {
      this.inclusions.splice(index, 1);
    }
  }

  addExclusions(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.exclusions.push(value);
    }
    event.chipInput!.clear();
  }

  removeExclusions(chip: string): void {
    const index = this.exclusions.indexOf(chip);
    if (index >= 0) {
      this.exclusions.splice(index, 1);
    }
  }

  formatFlag(flagEmoji: string) {
    var newFlag = flagEmoji.toLowerCase();
    var flag = this.baseFlag + newFlag + '.png';
    return flag;
  }
  codeValues: any;
  someValue ="asta";
}
