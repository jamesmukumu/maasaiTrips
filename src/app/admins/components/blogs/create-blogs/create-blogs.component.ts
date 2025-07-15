import { Component,OnInit,inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogsService } from '../../../../services/blogs.service';
@Component({
  selector: 'create-blogs',
  templateUrl: './create-blogs.component.html',
  styleUrl: './create-blogs.component.css'
})

export class CreateBlogsComponent {
readonly snack = inject(MatSnackBar)
choosenCategory = ''
blogCategoryTitle = ''
blogContent:any
blogThumbnail:any
processingSave = false
constructor(private blog:BlogsService){}
categories:any
fetchBlogCategories(){
this.processingCategories = true
this.blog.fetchBlogCategories().then((data)=>{
this.categories =  data
this.processingCategories = false
}).catch((err)=>{
console.error(err)
})
}
processingCategories = false
addBlogCategory = false

actualizeAdd(){
this.addBlogCategory = true
}

captureBlogContent(event:any){
  var {args} = event
this.blogContent = args[0]
}
captureThumbnails(event:any){
this.blogThumbnail = event.currentFiles[0]
}
saveBlog(){

this.processingSave = true
let payload = {
"blogTitle":this.blogCategoryTitle,
"blogContent":this.blogContent,
"thumbnail":this.blogThumbnail,
"blogCategories_id":this.choosenCategory
}
this.blog.createBlog(payload).then((data)=>{
var {message} = data
if(message == 'Blog has been Added Successfully'){
this.processingSave = false
this.snack.open("Blog Added","Success")

}else{
  this.processingSave = false
this.snack.open(message,"Failed")
}
})
}

ngOnInit(){
this.fetchBlogCategories()
}
}
