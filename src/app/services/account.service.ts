import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError} from 'rxjs/operators';



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
}
