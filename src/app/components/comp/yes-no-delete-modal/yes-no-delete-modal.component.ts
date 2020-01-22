import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AccountService } from 'src/app/services/account.service';
import { TrueModalComponent } from '../true-modal/true-modal.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-yes-no-delete-modal',
  templateUrl: './yes-no-delete-modal.component.html',
  styleUrls: ['./yes-no-delete-modal.component.css']
})
export class YesNoDeleteModalComponent implements OnInit {

  download = false;
  
  constructor(public dialogRef: MatDialogRef<YesNoDeleteModalComponent>,@Inject(MAT_DIALOG_DATA) public data : any,
  private accountService : AccountService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(id){
    this.download=true;
    this.accountService.deleteAccount(id).subscribe(
      (response) => {
        this.download=false;
        this.dialog.open(TrueModalComponent,{
          data : {message : "Account deleted with success!"}
        })
        this.dialogRef.close();
      },
      (e) => {
        this.download=false;
        this.dialog.open(ModalComponent,{
          data : {error : "Error occured while deleting the Account, please retry again!"}
        })
      })
  }

}
