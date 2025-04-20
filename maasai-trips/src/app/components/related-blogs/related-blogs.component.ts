import { Component,Input} from '@angular/core';
import { SafeHtml,DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'related-blogs',
  templateUrl: './related-blogs.component.html',
  styleUrl: './related-blogs.component.css'
})
export class RelatedBlogsComponent {
@Input() relatedBlogs:any
constructor(private sanitizor:DomSanitizer){}
sanitize(blogContent:SafeHtml| any){
  return this.sanitizor.bypassSecurityTrustHtml(blogContent)
 }
formatCreationDay(time:string){
return new Date(time).toLocaleString()
}
goBlog(baseUrl:string){
  window.open(`/blog/${baseUrl}`,'_blank')
  }
}
