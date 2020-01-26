import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class BranchDepService {

  constructor(private http : HttpClient) { }

  getBranches(): Observable<any>{
    return this.http.get(url +"branches").pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  getDepartements(): Observable<any>{
    return this.http.get(url +"departements").pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
