
import { GalleryService } from '../../services/gallery.service';

import { Component,ViewChild,AfterViewInit,ElementRef,OnInit } from '@angular/core';
import { trigger,transition,keyframes,style,animate } from '@angular/animations';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  animations:[
    trigger('bounceRight', [
      transition('clear => visible', [
        style({
          opacity: 1,
          transform: 'translateX(-48px)',
        }),
        animate(
          '1.55s ease-in-out',
          style({ transform: 'translateX(0px)', opacity: 1 })
        ),
      ]),
    ]),
  ]
})
export class GalleryComponent {
  bgBounce() {
    var observer = new IntersectionObserver((entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          this.bgState = 'visible';
        } else {
          this.bgState = 'clear';
        }
      });
    });
    observer.observe(this.bgRef.nativeElement);
  }
constructor(private gall:GalleryService){}
galleryContent:any[] = []
fetching = false
bgState: string = 'clear';
itemsShow = 12
allContent:any
loadMore(){
this.itemsShow += 12
this.galleryContent = this.allContent.splice(0,this.itemsShow)
}
@ViewChild('bg') bgRef!: ElementRef;
ngOnInit(){
this.fetching = true
this.gall.fetchGalleria().then((data:any)=>{
this.allContent = data.data
this.galleryContent = data.data.splice(0,this.itemsShow)
this.fetching = false
}).catch((err)=>console.error(err))

}

ngAfterViewInit() {
  this.bgBounce();
}

}
