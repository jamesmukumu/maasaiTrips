import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackagesService } from '../../services/packages.service';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'singular-package',
  templateUrl: './singular-package.component.html',
  styleUrl: './singular-package.component.css'
})
export class SingularPackageComponent {
constructor(private router:ActivatedRoute,private sanitizor:DomSanitizer,private packages:PackagesService){}
fetching = false
packageData:any
packageSlug = ''
relatedPackage:any


sanitize(data:SafeHtml|any){
  return this.sanitizor.bypassSecurityTrustHtml(data)
  }


async fetchPackage(){
try{
this.fetching = true
var {data,relatedPackages} = await this.packages.fetchSingularPackages(this.packageSlug)
this.packageData = data
this.relatedPackage = relatedPackages
this.fetching = false
}catch(err){
console.error(err)
this.fetching = false
}

}

formatInclusives(incl:any){
return JSON.parse(incl)
}

formatExclusives(excl:any){
  return JSON.parse(excl)
  }
formatPackageImages(packageImages:any){
return JSON.parse(packageImages)
}


ngOnInit(){
this.router.paramMap.subscribe((data)=>{
this.packageSlug = data.get("packageSlug") ?? ""
})

this.fetchPackage()
}

}
