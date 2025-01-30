import { Component,ViewChild,AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';



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



}
