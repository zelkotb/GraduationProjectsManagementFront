import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account';
import { MatDialog } from '@angular/material';
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
  id : any;
  roles = [{id: 1, role: "user"},{id: 2, role: "admin"},{id: 3, role: "professor"},{id: 4, role: "student"}]
  mapRoles;
  constructor(private router : Router, private accountService : AccountService,  private dialog : MatDialog, private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.id= this.activatedRoute.snapshot.paramMap.get('id');
    this.account = new Account();
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
  }

  getUserRoles(){
    if(this.mapRoles){
      this.account.roles = [];
      for (let key of this.mapRoles.keys()){
        if(this.mapRoles.get(key)==true){
          this.account.roles.push(key);
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
      console.log(response); 
      this.router.navigate(['/lists']);
      this.dialog.open(TrueModalComponent,{
        data : response
      })
      },
    (e) => {
      this.download=false;
      this.dialog.open(ModalComponent,{
        data : {error : e.error.errors}
      })
    })
  }

}
