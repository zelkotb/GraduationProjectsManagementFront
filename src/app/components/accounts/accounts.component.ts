import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AccountService } from 'src/app/services/account.service';
import { ModalComponent } from '../comp/modal/modal.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  displayedColumns: string[] = ['login', 'email', 'roles'];
  accounts = new MatTableDataSource();
  error : string;
  download = false;
  @ViewChild(MatSort, {static: false}) set content(sort: MatSort){
    this.accounts.sort = sort
  }

  @ViewChild(MatPaginator, {static: false}) set contente (paginator: MatPaginator){
    this.accounts.paginator = paginator;
  }

  constructor(private accountService : AccountService) { }


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

}
