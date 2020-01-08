import { Component, OnInit, ViewChild} from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog} from '@angular/material';
import { ModalComponent } from '../../comp/modal/modal.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit{

  displayedColumns: string[] = ['name', 'lastName', 'phone', 'birthDay', 'branch', 'graduationProject'];
  students = new MatTableDataSource();
  error : string;
  download = false;
  @ViewChild(MatSort, {static: false}) set content(sort: MatSort){
    this.students.sort = sort
  }

  @ViewChild(MatPaginator, {static: false}) set contente (paginator: MatPaginator){
    this.students.paginator = paginator;
  }

  constructor(private studentService : StudentService, private errorDialog : MatDialog) { }

  ngOnInit() {
    this.download = true;
    this.studentService.getClients().subscribe(
     (response) => {
       this.students.data = response.students
       this.download = false;
      },
     (e) => {
       this.errorDialog.open(ModalComponent,{
         data : e.error
       })
       this.download = false;
     }
   )
  }

  doFilter(value){
    this.students.filter = value.trim().toLowerCase();
  }

}
