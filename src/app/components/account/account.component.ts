import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ModalComponent } from '../comp/modal/modal.component';
import { Role } from 'src/app/models/role';
import { ActivatedRoute, Router } from '@angular/router';
import { TrueModalComponent } from '../comp/true-modal/true-modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account : Account;
  download = false;
  checked = false;
  downloadBig = false;
  @Input() id : any;
  roles = [{id: 1, role: "user"},{id: 2, role: "admin"},{id: 3, role: "professor"},{id: 4, role: "student"}]
  mapRoles;
  constructor(private router : Router, private accountService : AccountService,  
    private dialog : MatDialog, private activatedRoute : ActivatedRoute, public dialogRef: MatDialogRef<AccountComponent>) { }

  ngOnInit() {
    //this.id= this.activatedRoute.snapshot.paramMap.get('id');
    this.account = new Account();
    if(this.id){
      this.downloadBig = true;
      this.accountService.getAccount(this.id).subscribe(
        (response) => {
          this.downloadBig = false;
          this.account = response.account},
        (e) => {
          this.downloadBig = false;
          this.dialog.open(ModalComponent,{
            data : e.error
          })
        }
      )
    }
  }


  valueChange(key, $event) {
    //set the two-way binding here for the specific unit with the event
    this.mapRoles.set(key,$event.checked);
}

  isRoleExiste(role){
    if(role.role==this.roles[0].role){
      return true;
    }
    return false;
  }

  showRoles(){
    if(this.id){
      if(!this.mapRoles){
        this.mapRoles = new Map<Role,boolean>();
        this.account.roles.forEach(userRole => {
        this.mapRoles.set(userRole,true);
        var removeIndex = this.roles.map(r => r.id).indexOf(userRole.id);
        this.roles.splice(removeIndex,1);
      })
      this.roles.forEach(role => {
        this.mapRoles.set(role,false);
      });
      }
    }else{
      if(!this.mapRoles){
        this.mapRoles = new Map<Role,boolean>();
        this.roles.forEach(role => {
        this.mapRoles.set(role,false);
        });
      }
    }
  }

  getUserRoles(){
    if(this.id){
      if(this.mapRoles){
        this.account.roles = [];
        for (let key of this.mapRoles.keys()){
          if(this.mapRoles.get(key)==true){
            this.account.roles.push(key);
          }
        }
      }
    }else{
      this.account.roles = [];
      if(this.mapRoles){
        for (let key of this.mapRoles.keys()){
          if(this.mapRoles.get(key)==true){
            this.account.roles.push(key);
          }
        }
      }
    }
  }

  showHideRoles(){
    if(this.checked==false){
      this.checked = true;
      this.showRoles();
    }else{
      this.checked = false;
    }
  }

  updateAccount(){
    this.download=true;
    this.getUserRoles();
    this.accountService.updateAccount(this.id,this.account).subscribe(
      (response) => {
      this.download=false;
      this.dialog.open(TrueModalComponent,{
        data : {message : response.body.message}
      })
      this.dialogRef.close();
      },
    (e) => {
      this.download=false;
      this.dialog.open(ModalComponent,{
        data : {error : e.error.errors}
      })
    })
  }

  register(){
    this.download=true;
    this.getUserRoles();
    this.accountService.register(this.account).subscribe(
      (response) => {
      this.download=false;
      this.dialog.open(TrueModalComponent,{
        data : {message : response.body.message}
      })
      this.dialogRef.close();
      },
    (e) => {
      this.download=false;
      this.dialog.open(ModalComponent,{
        data : {error : e.error.errors}
      })
    })
  }

  registerOrUpdate(){
    if(this.id){
      this.updateAccount();
    }else{
      this.register();
    }
  }

}
