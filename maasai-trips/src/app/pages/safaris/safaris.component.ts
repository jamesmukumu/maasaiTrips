import { Component,ViewChild,AfterViewInit,ElementRef,inject,OnInit } from '@angular/core';
import { trigger,keyframes,style,transition,animate } from '@angular/animations';
interface Safaris {
  SafariTitle: string;
  Charges: number;
  Thumbnail: string;
  Inclusivities: string[];
}
import { PackagesService } from '../../services/packages.service';
import { QuotationsComponent } from '../../components/quotations/quotations.component';
import {MatDialog} from '@angular/material/dialog'
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser"



@Component({
  selector: 'app-safaris',
  templateUrl: './safaris.component.html',
  styleUrl: './safaris.component.css',
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
export class SafarisComponent implements AfterViewInit{
@ViewChild("bg") bgRef!:ElementRef
@ViewChild("landCruiserSafaris")landCruiserSafarisRef!:ElementRef
@ViewChild("airSafaris")airSafaris!:ElementRef
@ViewChild("jpSafaris")jpSafaris!:ElementRef

bgState:string = 'clear'
fetching = false
airSafariss:any = []
vanSafaris:any = []
jeepSafaris:any = []
landCruiserSaf:any = []
readonly dialog = inject(MatDialog)
constructor(private packages:PackagesService,private router:Router,private titlePage:Title){}
async fetchSafaris(){
this.fetching = true
try{ 
var  {vanPackages,landCruiserPackages,airPackages,jeepPackages} = await this.packages.fetchHotPackages()
this.airSafariss = airPackages
this.vanSafaris = vanPackages
this.jeepSafaris = jeepPackages
this.landCruiserSaf= landCruiserPackages
this.fetching = false
}catch(err){
console.error(err)
this.fetching = false
}

}
async ngOnInit(){
await this.fetchSafaris()
this.requestQuote()
}
requestQuote(){
this.dialog.open(QuotationsComponent)
}
goPackage(slug:any){
  window.open(`/safaris/${slug}`,"_blank")
// this.router.navigate([`/safaris/${slug}`])
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


ngAfterViewInit(){
this.titlePage.setTitle("Explore Adventurous Maasai Safaris | Maasai Mara Trips")
this.bgBounce()

}
scrollSafaris(){
this.landCruiserSafarisRef.nativeElement.scrollIntoView({
behavior:"smooth",
block:"start"
})
}

scrollAirSafaris(){
  this.airSafaris.nativeElement.scrollIntoView({
  behavior:"smooth",
  block:"start"
  })
  }

  scrollJPSafaris(){
    this.jpSafaris.nativeElement.scrollIntoView({
      behavior:"smooth",
      block:"start"
      })
  }
  safaris: any[] = [];
}
