import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError} from 'rxjs/operators';
import { Account } from '../models/account';



const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http : HttpClient) { }

  getAccounts():Observable<any>{
    return this.http.get<any>(url+"accounts/").pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  getAccount(id : number):Observable<any>{
    return this.http.get<any>(url+"accounts/"+id).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  getAccountId(login : string):Observable<any>{
    return this.http.post(url + "accounts",login,{observe : 'response'}).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  register(account : Account):Observable<any>{
    return this.http.post(url + "accounts/register",account,{observe : 'response'}).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  updateAccount(id : number, account : Account):Observable<any>{
    return this.http.put(url + "accounts/"+id,account,{observe : 'response'}).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  changePassword(id : number){
    return this.http.get(url + "accounts/change/"+id).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  deleteAccount(id : number){
    return this.http.delete(url + "accounts/" + id).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

}
