import { ResolveFn } from '@angular/router';
import { PackagesService } from '../services/packages.service';
import { inject } from '@angular/core';
export const packagesResolver: ResolveFn<any> = (route, state) => {
 let package_init = inject(PackagesService)
 
return package_init.fetchHotPackages()

};
 