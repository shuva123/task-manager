import { Component, OnInit, ViewChild } from '@angular/core';
import { RestserviceService } from '../restservice.service';
import { Task } from 'src/app/task';
import { MatTableDataSource,MatPaginator,MatSort } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  allTasks:Task[];
  dataSource: MatTableDataSource<Task>;
  displayedColumns: string[] = ['Name', 'Priority', 'Start_Date', 'End_Date','Parent_Task_Name','actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSaved = false;  
  stringifiedData: any;
  massage = null;
  TaskForm: any;

  constructor(private formbulider: FormBuilder, private taskService:RestserviceService) { 
   
  }

  ngOnInit():void {   
    this.taskService.getAllTask().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
    });   
}    
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editTask()
  {
    
  }
  endTask(id:string) {  
    this.TaskForm = {  
      Task_ID: id, 
      IsActive: 'N'
      };
    this.taskService.endTask(this.TaskForm).subscribe(  
      () => {  
        this.dataSaved = true;  
        alert('Task Ended Successfully'); 
        window.location.href="/view-task"; 
      },
      error => console.error(error)
    ); 
}
}
