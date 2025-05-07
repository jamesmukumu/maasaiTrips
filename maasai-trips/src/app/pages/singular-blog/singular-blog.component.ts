import { Component,OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../../services/blogs.service';
import { DomSanitizer,SafeHtml,Title } from '@angular/platform-browser';
@Component({
  selector: 'singular-blog',
  templateUrl: './singular-blog.component.html',
  styleUrl: './singular-blog.component.css'
})
export class SingularBlogComponent {
blogSlug = ''
findingBlog = false
blogData:any
relevantBlogs:any
constructor(private titlePage:Title,private sanitizor:DomSanitizer,private router:ActivatedRoute,private blogs:BlogsService){}

sanitize(blogContent:SafeHtml| any){
  return this.sanitizor.bypassSecurityTrustHtml(blogContent)
 }
formatCreationDay(time:string){
return new Date(time).toLocaleString()
}
shareOnTwitter() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`Check out this blog: ${this.blogData.blogTitle}`);
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

shareOnLinkedIn() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(this.blogData.blogTitle);
  const summary = encodeURIComponent('Check out this interesting blog post');
  window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`, '_blank');
}

shareOnWhatsApp() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`Check out this blog: ${this.blogData.blogTitle} - ${url}`);
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

shareOnInstagram() {

  window.open('https://www.instagram.com/', '_blank');

}

findBlog(){
this.findingBlog = true
this.blogs.fetchSingularBlog(this.blogSlug).then((data)=>{
var {message,blogData,relevantBlogs} = data
if(message === 'Blog Fetched'){
this.blogData = blogData
this.relevantBlogs = relevantBlogs
this.titlePage.setTitle(blogData.blogTitle)
this.findingBlog = false
}
}).catch((err)=>{
console.log(err)
})
}



ngOnInit(){
this.router.paramMap.subscribe((activeRoutes)=>{
this.blogSlug = activeRoutes.get('blogSlug') ?? ""
})
this.findBlog()
}
}
