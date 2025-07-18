import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'related-packages',
  templateUrl: './related-packages.component.html',
  styleUrl: './related-packages.component.css'
})
export class RelatedPackagesComponent {
@Input() packageData:any
 constructor(private router:Router){}

visitPackage(slug:any){
this.router.navigate([`safaris/${slug}`])
}


}
