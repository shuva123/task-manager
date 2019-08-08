import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task';
import { RestserviceService } from '../restservice.service';


@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  dataSaved = false;  
  Task:any;
  Parent_ID:any;
  TaskId:any;
  Priority:any;
  Parent_Task:any;
  Start_Date:any;
  End_Date:any;
  TaskForm: any;  
  taskIdUpdate = null;  
  message = null;
  id:number;
  public tasks:Task;


  constructor(private formbulider: FormBuilder, private taskService:RestserviceService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.taskService.getTaskById(this.id.toString()).subscribe(data=>{this.tasks=data,this.SetValuesForEdit(this.tasks)});
  }
  updateTask(taskName:string,taskid:number,parenttask:string,priority:string,startdate:Date,endDate:Date,parentId:number) {   
    this.TaskForm = {  
      Task: taskName, 
      Task_ID: taskid,
      Priority: priority,
      Parent_Task:parenttask,
      Start_Date: startdate,
      End_Date: endDate,
      Parent_ID:parentId
      };
      console.log(taskName + " "+ endDate + " "+ priority+ " "+ startdate + " "+ parentId + " " + taskid + " "+ parenttask)
    this.taskService.updateTask(this.TaskForm).subscribe(  
      () => {  
        this.dataSaved = true;  
        this.message = 'Record updated Successfully'; 
        alert(this.message);
        window.location.href="/view-task";
      },
      error => console.error(error)
    ); 
  }
  SetValuesForEdit=function(task:Task)  
{  
  this.TaskId=task[0].Id;
  this.Parent_ID=task[0].Parent_ID;
  this.Task=task[0].Name;  
  this.Start_Date=new Date(task[0].Start_Date).toISOString().substring(0,10);
  this.End_Date=new Date(task[0].End_Date).toISOString().substring(0,10);
  this.Priority=task[0].Priority;  
  this.Parent_Task=task[0].Parent_Task_Name;  
}


}
