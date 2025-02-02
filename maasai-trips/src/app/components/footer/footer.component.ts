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
