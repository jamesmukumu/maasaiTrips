import { CanActivateFn,Router } from '@angular/router';
import Cookies from 'js-cookie';
import { inject } from '@angular/core';
export const authGuardGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  var token = Cookies.get("grant_token")
  if(token == undefined || token == ''){
  return router.navigate(["/page/not found"])
  }
  return true
};
