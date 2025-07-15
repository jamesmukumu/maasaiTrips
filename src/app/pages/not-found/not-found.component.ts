import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
constructor(private router:Router,private titlePage:Title){}
home(){
this.router.navigate(["/"])
}
ngOnInit(){
this.titlePage.setTitle("Page Not Found | Error 404")
}

}
