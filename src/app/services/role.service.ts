import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const url = environment.url;


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http : HttpClient) { }

  getRoles():Observable<any>{
    return this.http.get<any>(url+"roles/").pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
