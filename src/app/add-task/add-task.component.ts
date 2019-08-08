import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators  } from "@angular/forms";
import { RestserviceService } from '../restservice.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  dataSaved = false;  
  TaskForm: any;  
  // allTasks: Observable<Task[]>;  
  taskIdUpdate = null;  
  message = null;

  constructor(private formbulider: FormBuilder, private taskService:RestserviceService) { }

ngOnInit() {
    this.TaskForm = this.formbulider.group({  
    Task: ['', [Validators.required]],  
    Priority: [null, [Validators.required]],
    Parent_Task: ['', [Validators.required]],       
    Start_Date: ['', [Validators.required]],  
    End_Date: ['', [Validators.required]]
    }); 
  }

  createTask(form) {   
      this.taskService.createTask(form).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.message = 'Record saved Successfully'; 
          alert(this.message); 
          this.TaskForm.reset();  
        },
        error => console.error(error)
      ); 
  }  

}