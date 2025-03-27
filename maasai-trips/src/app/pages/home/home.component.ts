import { Component,ElementRef,ViewChild,AfterViewInit,OnInit } from '@angular/core';
import { trigger, style, animate, transition,state,keyframes } from '@angular/animations';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('bouncer', [
      transition('hide => see', [
        animate('1.55s', keyframes([
          style({ opacity: 0, transform: 'translateX(-250px)', offset: 0, easing: 'ease-in' }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 0.38, easing: 'ease-out' }),
          style({ transform: 'translateX(-68px)', offset: 0.55, easing: 'ease-in' }),
          style({ transform: 'translateX(0)', offset: 0.72, easing: 'ease-out' }),
          style({ transform: 'translateX(-28px)', offset: 0.81, easing: 'ease-in' }),
          style({ transform: 'translateX(0)', offset: 0.90, easing: 'ease-out' }),
          style({ transform: 'translateX(-8px)', offset: 0.95, easing: 'ease-in' }),
          style({ transform: 'translateX(0)', offset: 1, easing: 'ease-out' })
        ]))
      ])
    ]),

    trigger("explores",[
       transition("here => there",[
style({opacity:0,transform:"scale(1)"}),
animate("0.5s ease-out",keyframes([
style({transform:"scale3d(1,1,1)",offset:0}),
style({transform:"scale3d(1.25,0.75,1)",offset:0.3}),
style({transform:"scale3d(0.75,1.25,1)",offset:0.40}),
style({transform:"scale3d(1.15,0.85,1)",offset:0.50}),
style({transform:"scale3d(0.95,1.05,1)",offset:0.65}),
style({transform:"scale3d(1.05,0.95,1)",offset:0.75}),
style({transform:"scale3d(1,1,1)",offset:1}),
]))

       ])

    ]),



    trigger('fadeSlider', [
      transition('void => visible', [
        style({ 
          opacity: 0,
          transform: 'scale(1)', 
        }),
        animate('2000ms cubic-bezier(0.25, 0.8, 0.25, 1)', keyframes([
          style({
            opacity: 0.7,
            transform: 'translateY(-30px) scale(1.1)', 
            offset: 0.3,
          }),
          style({
            opacity: 1,
            transform: 'translateY(0) scale(1)', 
            offset: 0.6,
          }),
          style({
            opacity: 1,
            transform: 'translateY(-10px) scale(1.05)', 
            offset: 0.8,
          }),
          style({
            opacity: 1,
            transform: 'translateY(0) scale(1)', 
            offset: 1,
          })
        ]))
      ])
    ])
  ]
  
})
export class HomeComponent implements AfterViewInit{  
constructor(private titlePage:Title){}
@ViewChild("animatedElement")animatedElement!:ElementRef
@ViewChild("bouncerCheck")animatedBounce!:ElementRef
@ViewChild("explores")exploresEffect!:ElementRef



animationState:string = 'void'
animationBouncer:string = 'hide'
exploreCheckerState:string = 'here'

checkWheterView(){
var observer = new IntersectionObserver((entries)=>{
entries.forEach((ent)=>{
ent.isIntersecting ? this.animationBouncer = 'see': this.animationBouncer ='hide'
})
})

observer.observe(this.animatedBounce.nativeElement)
}

checkExplores(){
var observer = new IntersectionObserver((entries)=>{
  entries.map((ent)=>{
    ent.isIntersecting ? this.exploreCheckerState = 'there':this.exploreCheckerState = 'here'

  })
})
observer.observe(this.exploresEffect.nativeElement)
}
ngAfterViewInit(){
  var observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
if(entry.isIntersecting){
this.animationState = 'visible'

}else{
this.animationState = 'void'
}

    })
  })
  observer.observe(this.animatedElement.nativeElement)
this.checkWheterView()
this.checkExplores()



}
ngOnInit(){
this.titlePage.setTitle("Maasai Mara Trips")
}

}
