import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';
import { BranchDepService } from 'src/app/services/branch-dep.service';
import { AccountService } from 'src/app/services/account.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Account } from 'src/app/models/account';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { AccountComponent } from '../account/account.component';
import { TrueModalComponent } from '../comp/true-modal/true-modal.component';
import { ModalComponent } from '../comp/modal/modal.component';
import { SnackBarComponent } from '../comp/snack-bar/snack-bar.component';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  student : Student;
  minDate = new Date(1990, 0, 1);
  maxDate = new Date(2019, 0, 1);
  branches = [];
  download = false;
  account;
  durationInSeconds = 5;
  selectedImg : File;
  progress = 0;

  constructor(private studentService : StudentService, private branchDepService : BranchDepService, private _snackBar: MatSnackBar,
    private accountService : AccountService, private authService : AuthenticationService) { }

  ngOnInit() {
    this.account = new Account();
    this.student = new Student();
    this.branchDepService.getBranches().subscribe(
      resp => {this.branches = resp.branches},
      err => console.error(err)
    )
    this.accountService.getAccountId(this.authService.getSubFromToken()).subscribe(
      resp => {this.account.id = resp.body.id},
      err => console.error(err)
    )
  }

  //to make the right format for the date
  manipulateDate(){
    let newDate = (JSON.stringify(this.student.birthDay)+"").substring(1,11);
    this.student.birthDay = newDate;
    console.log(newDate);
  }

  //to add +212 for phone
  manipulatePhone(){
    this.student.phone = "+212"+this.student.phone;
    console.log(this.student.phone);
  }

  saveStudent(){ 
    this.download = true;
    this.manipulateDate();
    this.manipulatePhone();
    this.student.account = this.account;
    console.log(this.student);
    this.studentService.saveStudent(this.student).subscribe(
      (response) => {
        this.download=false;
        this.openSnackBar();
        console.log(response);

      }
    )
  }

  openSnackBar() {
    const snackBar = this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
    let instance = snackBar.instance;
    instance.title = "Congratulations!! you have now a profil"
  }

  selectImage(event){
    this.selectedImg = event.target.files[0];
    if(this.selectedImg.type.indexOf('image') < 0){
      this.selectedImg = null;
    }
  }

  upload(){
    if(this.selectedImg){
      this.studentService.uploadImage(this.selectedImg).subscribe(
        event => {
          if(event.type ===  HttpEventType.UploadProgress){
            this.progress = Math.round((event.loaded/event.total)*100)
          }
          else if(event.type ===  HttpEventType.Response){
            let resp : any = event.body;
            this.student.image=resp.fileName;
          }
        },
        err => console.error(err)
      )
    }
  }

}
