import { Component,ViewChild,AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
seeDrawer:boolean = false
toggle(){
this.seeDrawer = true
}
home(){
this.route.navigate(["/"])
}
navigate(){
this.route.navigate(["/safaris"])
}
constructor(private route:Router){}
}
