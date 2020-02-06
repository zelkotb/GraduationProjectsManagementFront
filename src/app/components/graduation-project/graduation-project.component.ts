import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-graduation-project',
  templateUrl: './graduation-project.component.html',
  styleUrls: ['./graduation-project.component.css']
})
export class GraduationProjectComponent implements OnInit {

  constructor( private router : Router, private studentService : StudentService, private authService : AuthenticationService) { }

  ngOnInit() {
    this.studentService.doesAccountHaveStudent(this.authService.getSubFromToken()).subscribe(
      resp => {
        if(!resp.itDoes){
          this.router.navigate(['/student'])
        }
      },
      err =>  this.router.navigate(['/login'])
    )
  }

}
