import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';




@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate{

    constructor(private authService : AuthenticationService, private router : Router){}

    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot){
        if(this.authService.isLoggedIn()){
            return true;
        }else{
            this.router.navigate(['/login']);
        }
    }
}