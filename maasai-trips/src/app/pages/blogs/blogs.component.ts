import { Component,AfterViewInit,ViewChild,ElementRef,OnInit } from '@angular/core';
import { animate,style,transition,trigger } from '@angular/animations';
import { BlogsService } from '../../services/blogs.service';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
  animations:[
    trigger('bounceRight', [
      transition('clear => visible', [
        style({
          opacity: 1,
          transform: 'translateX(-48px)'
        }),
        animate(
          '1.55s ease-in-out',
          style({ transform: 'translateX(0px)', opacity: 1 })
        )
      ])
    ])
  ]
})
export class BlogsComponent implements AfterViewInit {
  bgState:string = 'clear'
  processingBlogs = false
  blogData:any
  @ViewChild("bg") bgRef!:ElementRef

    sanitize(blogContent:SafeHtml| any){
     return this.sanitizor.bypassSecurityTrustHtml(blogContent)
    }
formatCreationDay(time:string){
return new Date(time).toLocaleString()
}
goBlog(baseUrl:string){
window.open(`/blog/${baseUrl}`,'_blank')
}
  bgBounce(){
    var observer = new IntersectionObserver((entries)=>{
    entries.map((entry)=>{
    if(entry.isIntersecting){
    this.bgState = 'visible'
    }else{
    this.bgState = 'clear'
    }
    
    })
    
    
    })
    observer.observe(this.bgRef.nativeElement)
    }
    ngOnInit(){
      this.processingBlogs = true
      this.blog.fetchBlogsDisplay().then((data:any)=>{
      if(data.message == 'Blogs Fetched'){
        this.blogData = data.blogs
       this.processingBlogs = false
       this.bgBounce()
      }
}).catch((err)=>{
console.log(err)
})
    }
    constructor(private blog:BlogsService,private sanitizor:DomSanitizer){}
    ngAfterViewInit(){

      this.bgBounce()
      
      }




}
