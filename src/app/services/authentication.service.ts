import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError} from 'rxjs/operators';
import { Account } from '../models/account';
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../components/comp/modal/modal.component';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  helper = new JwtHelperService();

  constructor(private http : HttpClient, private router : Router) { }

  isNotAuthorized(e){
    if(e.status == 401 || e.status == 403){
      this.logout();
      return true;
    }
    return false;
  }

  login(account : Account): Observable<any>{
   return this.http.post(url+"login", account, {observe : 'response'}).pipe(
    map(res => this.setSession(res)),
    catchError(e => {
      return throwError(e);
    })
   )
  }

  setSession(res){
    if(res.status == 200){
      const BearerToken = res.headers.get("Authorization");
      const token =  BearerToken.replace('Bearer ', '');
      localStorage.setItem('token',token);
      this.router.navigate(['/lists']);
    }
  }

  logout(){
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
  }

  decodeToken(){
    let token = localStorage.getItem('token');
    return this.helper.decodeToken(token);
  }

  isLoggedIn(){
    let token = localStorage.getItem('token');
    if(token){
      return true;
    }
    return false;
  }

}
