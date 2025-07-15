import { Component,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {SafeHtml,DomSanitizer} from "@angular/platform-browser"
@Component({
  selector: 'app-preview-all',
  templateUrl: './preview-all.component.html',
  styleUrl: './preview-all.component.css'
})
export class PreviewAllComponent {
constructor(private store:Store,private sanitizer:DomSanitizer){}
previewerData:SafeHtml = ''
ngOnInit(){
this.store.subscribe((data:any)=>{

var {preview} = data

this.previewerData = this.sanitizer.bypassSecurityTrustHtml(preview)
})
}

}
