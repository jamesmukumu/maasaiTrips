import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Hotel, HotelsService } from '../../../../services/hotels.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {Store} from "@ngrx/store"
import { BlogsService } from '../../../../services/blogs.service';
@Component({
  selector: 'manage-blogs',
  templateUrl: './manage-blogs.component.html',
  styleUrl: './manage-blogs.component.css',
  providers:[MessageService,ConfirmationService]
})
export class ManageBlogsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly snack = inject(MatSnackBar);
  choosenCategory:any
  blogCategoryTitle = ''
  blogContent:any
  blogThumbnail:any
  processingSave = false
  displayedColumns: string[] = ['blogTitle',"blogCategoryTitle", 'published',"actionPending", 'actions'];
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
  constructor(private blog:BlogsService,private store:Store,private msg:MessageService,private hotels: HotelsService,private confirm:ConfirmationService) {}
  destinationTitle: string = '';

  destinationDescription: any;
  Thumbnail: any;



changeBlogCategoryTitle(event:any){
this.choosenCategory = event.value
}

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
        // this.fetchMyDestinations()
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
  // actualizeAdd(){
  //   this.addBlogCategory = true
  //   }
    processingCategories = false
    categories:any
    captureBlogContent(event:any){
      var {args} = event
    this.blogContent = args[0]
    }
    captureThumbnails(event:any){
    this.blogThumbnail = event.currentFiles[0]
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
        // this.fetchMyDestinations()
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
      var { message } = await this.blog.deleteBlog(
        this.idSelected
      );
      if (message == 'Blog Deleted Successfully') {
        this.snack.open(' Blog Deleted 😀', 'Success');

         this.fetchMyBlogs();
         this.deleteDestination = false

      } else {
        this.snack.open('Something went wrong', 'Failed');
        this.processing = false;
        this.deleteDestination = false
      }
    } catch (err) {
      console.error(err);
    }
  }
  updateBlog(){
this.processingSave = true
    let payload = {
    "blogTitle":this.blogCategoryTitle ?? null,
    "blogContent":this.blogContent ?? null,
    "thumbnail":this.blogThumbnail ??  null ,
    "blogCategories_id":this.choosenCategory ?? null
    }
    this.blog.updateBlog(payload,this.idSelected).then((data)=>{
    var {message} = data
    if(message == 'Blog has been Updated Successfully'){
    this.processingSave = false
    this.updateDestination = false
    this.fetchMyBlogs()
    this.snack.open("Blog Updated","Success")
    
    }else{
      this.processingSave = false
    this.snack.open(message,"Failed")
    this.updateDestination = false
    }
    })
    }
  async actualizeUn_publishDestination() {
  
    this.processing = true;
    try {
      var { message } = await this.blog.unpublishBlog(
        this.idSelected
      );
      if (message == 'Blog has been un-published') {
        this.unpublishDestination = false;
        this.snack.open('Blog Un-Published 😀', 'Success');
        this.fetchMyBlogs();
      } else {
        this.snack.open('Something went wrong', 'Failed');
        this.processing = false;
        this.unpublishDestination = false;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async actualizepublishDestination() {
  
    this.processing = true;
    try {
      var { message } = await this.blog.publishBlog(
        this.idSelected
      );
      if (message == 'Blog has been published') {
        this.publishDestination = false
        this.snack.open('Blog Published 😀', 'Success');
        this.fetchMyBlogs();
      } else {
        this.snack.open('Something went wrong', 'Failed');
        this.processing = false;
        this.publishDestination = false
      }
    } catch (err) {
      console.error(err);
    }
  }
  async fetchMyBlogs() {
    this.processing = true;
    try {
      var { data, message } = await this.blog.fetchMyBlogs();
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.processing = false;
    } catch (err) {
      console.error(err);
    }
  }
  fetchingBlogCategories = false
  popUpdate(id: any, data: any) {
  console.log(data)
  this.blogCategoryTitle = data.blogTitle
  this.idSelected = id
  this.blogContent = data.blogContent
  
  this.updateDestination = true;
  }
  fetchBlogCategories(){
    this.processingCategories = true
    this.blog.fetchBlogCategories().then((data)=>{
    this.categories =  data
    this.processingCategories = false
    }).catch((err)=>{
    console.error(err)
    })
    }
  popDeleteDestination(id: any,element:any) {
    this.idSelected = id;
    this.deleteDestination = true;
    this.blogCategoryTitle = element.blogTitle
  }
  popPublish(id: any) {
    this.idSelected = id;
    this.publishDestination = true;
  }

  popUn_Publish(id: any) {
    this.idSelected = id;
    this.unpublishDestination = true;
  }
  adminStatus = false
async  ngOnInit() {
    this.store.subscribe((data:any)=>{
      var {statusAdmin} = data
      this.adminStatus = statusAdmin
    })
    await this.fetchMyBlogs() 
    await this.fetchBlogCategories()
  }
}
