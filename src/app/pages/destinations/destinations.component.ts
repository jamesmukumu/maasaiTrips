import { Component,OnInit,ElementRef,ViewChild,AfterViewInit } from '@angular/core';
import { Hotel,HotelsService } from '../../services/hotels.service';
import { Router } from '@angular/router';
import { DomSanitizer,SafeHtml,Title } from '@angular/platform-browser';
import { trigger,transition,keyframes,style,animate } from '@angular/animations';

@Component({
  selector: 'destinations',
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css',
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
export class DestinationsComponent implements AfterViewInit {
  @ViewChild('bg') bgRef!: ElementRef;
  bgState: string = 'clear';
destinations:any[] = []
findingDestinations = false
constructor(private titlePage:Title,private hotel:HotelsService,private router:Router,private sanitizer:DomSanitizer){}
goDestinations(id:any,title:any){  
window.open(`/destinations/${title}/${id}`,"_blank")
}
sanitize(data:SafeHtml|any){
return this.sanitizer.bypassSecurityTrustHtml(data)
}

async fetchDestinations(){
this.findingDestinations = true
try{
var {destinations} = await this.hotel.fetchDestinationsDisplay()
this.destinations = destinations
this.findingDestinations = false
}catch(err){
console.error(err)
}
}

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


ngOnInit(){
this.fetchDestinations()
this.titlePage.setTitle("Explore scenic destinations | Maasai Mara Trips")
}

ngAfterViewInit(){
this.bgBounce()
}
}
