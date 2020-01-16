import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-true-modal',
  templateUrl: './true-modal.component.html',
  styleUrls: ['./true-modal.component.css']
})
export class TrueModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any, private router : Router) { }

  ngOnInit() {
  }

}
