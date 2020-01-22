import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AccountService } from 'src/app/services/account.service';
import { ModalComponent } from '../comp/modal/modal.component';
import { AccountComponent } from '../account/account.component';
import { TrueModalComponent } from '../comp/true-modal/true-modal.component';
import { YesNoModalComponent } from '../comp/yes-no-modal/yes-no-modal.component';
import { YesNoDeleteModalComponent } from '../comp/yes-no-delete-modal/yes-no-delete-modal.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  displayedColumns: string[] = ['login', 'email', 'password', 'roles', 'delete'];
  accounts = new MatTableDataSource();
  error : string;
  download = false;
  selectedId : number;

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort){
    this.accounts.sort = sort
  }

  @ViewChild(MatPaginator, {static: false}) set contente (paginator: MatPaginator){
    this.accounts.paginator = paginator;
  }

  constructor(private accountService : AccountService, private dialog: MatDialog) { }


  ngOnInit() {
    this.download = true;
    this.accountService.getAccounts().subscribe(
     (response) => {
       this.accounts.data = response.accounts
       this.download = false;
      },
     (e) => {
       this.download = false;
     }
   )
  }

  doFilter(value){
    this.accounts.filter = value.trim().toLowerCase();
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(AccountComponent, {
      width: '700px'
    });
    let instance = dialogRef.componentInstance;
    instance.id = id;
  }

  openDialogRegister(): void {
    const dialogRef = this.dialog.open(AccountComponent, {
      width: '700px'
    });
  }

  generatePassword(id,login){
    const dialogRef = this.dialog.open(YesNoModalComponent, {
      width: '700px',
      data: {login: login, id: id}
    });
  }

  delete(id,login){
    const dialogRef = this.dialog.open(YesNoDeleteModalComponent, {
      width: '700px',
      data: {login: login, id: id}
    });
  }

}
