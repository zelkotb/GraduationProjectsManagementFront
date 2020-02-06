import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Account } from 'src/app/models/account';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../../comp/modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  download = false;
  account : Account;

  constructor(private authService : AuthenticationService, private router : Router, private errorDialog : MatDialog) { }

  ngOnInit() {
    this.account = new Account();
  }

  Onlogin(){
    this.download = true;
    this.authService.login(this.account).subscribe(
      resp => {
        this.download=false;
      },
      err => {
        console.error(err)
        this.download=false;
        this.errorDialog.open(ModalComponent,{
          data : {error:"Login or password is incorrect"}
        })
      }
    )
  }
  

}
