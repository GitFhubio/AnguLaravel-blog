import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public mservice:MainService,public router:Router) {
   }
   canActivate(route: ActivatedRouteSnapshot): any {

    if (!route.data.roles.includes(this.mservice.current('roles'))) {
      this.router.navigate(['/admin']);
      return false;
    }
    return true;
  }
}
