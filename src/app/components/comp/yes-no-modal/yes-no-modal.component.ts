import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { AccountService } from 'src/app/services/account.service';
import { TrueModalComponent } from '../true-modal/true-modal.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-yes-no-modal',
  templateUrl: './yes-no-modal.component.html',
  styleUrls: ['./yes-no-modal.component.css']
})
export class YesNoModalComponent implements OnInit {

  download = false;

  constructor(public dialogRef: MatDialogRef<YesNoModalComponent>,@Inject(MAT_DIALOG_DATA) public data : any,
  private accountService : AccountService, private dialog: MatDialog) { }

  
  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(id){
    this.download=true;
    this.accountService.changePassword(id).subscribe(
      (response) => {
        this.download=false;
        this.dialog.open(TrueModalComponent,{
          data : {message : "The new password has been send to the user's email!"}
        })
        this.dialogRef.close();
      },
      (e) => {
        this.download=false;
        this.dialog.open(ModalComponent,{
          data : {error : "Error occured while changing the password, please retry again!"}
        })
      })
  }
}
