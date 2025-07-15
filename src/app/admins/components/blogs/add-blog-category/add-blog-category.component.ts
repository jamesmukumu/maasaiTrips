import { Component,inject } from '@angular/core';
import { BlogsService } from '../../../../services/blogs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'add-blog-category',
  templateUrl: './add-blog-category.component.html',
  styleUrl: './add-blog-category.component.css',
  providers:[MessageService]
})
export class AddBlogCategoryComponent {
readonly snack = inject(MatSnackBar)
processing = false
blogCategoryName = ''
blogDescription=''
constructor(private blog:BlogsService,private msg:MessageService){}
captureBlogDescription(event:any){
this.blogDescription = event.htmlValue
}

savingBlogCategory(){
this.processing = true
var payload = {
'blogCategoryTitle':this.blogCategoryName,
'blogCategoryDescription':this.blogDescription
}
this.blog.createBlogCategory(payload).then((data)=>{
var {message} = data
if(message == 'Blog Category Added'){
this.msg.add({severity:"success",detail:message,life:13000})

this.processing = false
}else{
this.msg.add({severity:"error",detail:"Something Went Wrong",life:13000})
this.processing = false
}
})
}


}
