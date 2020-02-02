import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Student } from '../models/student';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http : HttpClient, private authService : AuthenticationService) { }

  getClients() : Observable<any> {
    return this.http.get<any>(url+"students/").pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  saveStudent(student : Student){
    return this.http.post(url + "students", student , {observe : 'response'}).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  uploadImage(image : File) : Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("image" , image);
    const req = new HttpRequest("POST", url + "students/upload/", formData, {
      reportProgress : true
    })
    return this.http.request(req);
  }

  
}
