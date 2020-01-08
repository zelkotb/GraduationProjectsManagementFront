import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { map, catchError} from 'rxjs/operators';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http : HttpClient) { }

  getClients() : Observable<any> {
    return this.http.get<any>(url+"students/").pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  
}
