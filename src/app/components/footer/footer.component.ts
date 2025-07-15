import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
yr:number = new Date().getFullYear()
constructor(private router:Router){}

downloadApp(){
window.open("https://drive.google.com/file/d/13-YsbAsIT1VFDzq_-jRL3fPOOJi99hve/view?usp=sharing")
}
goSocials(url:string){
window.open(url,"_blank")
}

home(){
this.router.navigate(["/"])
}
safaris(){
this.router.navigate(["/safaris"])
}
accomodations(){
this.router.navigate(["/accomodations"])
}

}
