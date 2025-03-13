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
bgState:string = 'clear'
fetching = false
readonly dialog = inject(MatDialog)
constructor(private packages:PackagesService,private router:Router){}
async fetchSafaris(){
this.fetching = true
try{ 
var  {data} = await this.packages.fetchHotPackages()
this.safaris = data
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
this.router.navigate([`/safaris/${slug}`])
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
this.bgBounce()
}
  safaris: any[] = [];
}
