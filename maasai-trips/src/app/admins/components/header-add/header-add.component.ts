import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'header-add',
  templateUrl: './header-add.component.html',
  styleUrl: './header-add.component.css'
})
export class HeaderAddComponent {
constructor(private router:Router){}
signIn(){
this.router.navigate(["/login"])
}
signUp(){
this.router.navigate(["/register"])
}


}
