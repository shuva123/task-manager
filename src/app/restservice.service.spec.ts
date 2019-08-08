import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RestserviceService } from './restservice.service';
import { Task } from './task';
import { updatedTask } from './UpdatedTask';
import { endTask } from './endTask';

let service : RestserviceService
let httpMock: HttpTestingController

describe('RestserviceService', () => {
  beforeEach(() => {TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [RestserviceService]
  });
  service=TestBed.get(RestserviceService);
  httpMock=TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('restservice should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all tasks from API by getAllTask method via GET and should have one get request', () => {
    const dummyPost: Task[] =[{
    Task: 'Test Task',  
    Priority: 10,
    Parent_Task: 'Parent Test Task',
    Start_Date: new Date(2019,7,5),
    End_Date: new Date(2019,7,6)
    },
    {
      Task: 'Test Task 1',  
      Priority: 16,
      Parent_Task: 'Parent Test Task 1',
      Start_Date: new Date(2019,7,5),
      End_Date: new Date(2019,7,6)
      }]
    service.getAllTask().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPost);
    });
    const request=httpMock.expectOne(`${service.url}/`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPost);
  });

  it('should retrieve specific task from API by getTaskById method via GET', () => {
    const dummyPost1: updatedTask ={
      Task_ID:1,
      Task: 'Test Task',  
      Priority: 10,
      Parent_Task: 'Parent Test Task',
      Parent_ID: 1,
      Start_Date: new Date(2019,7,5),
      End_Date: new Date(2019,7,6)
      }
    let taskid ="1";
    service.getTaskById(taskid).subscribe(posts => {
      expect(posts).toEqual(dummyPost1);
    });

    const request=httpMock.expectOne(`${service.url}/` + taskid);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPost1);
  });

  it('should pass specific task to be inserted to API by createTask method via POST', () => {
    const task: Task ={
      Task: 'Test Task',  
      Priority: 10,
      Parent_Task: 'Parent Test Task',
      Start_Date: new Date(2019,7,5),
      End_Date: new Date(2019,7,6)
      }
      service.createTask(task).subscribe(posts => {
      });
      const request=httpMock.expectOne(`${service.url}/`);
      expect(request.request.method).toBe('POST');
      request.flush(task);
});

it('should pass specific task to be updated to API by updateTask method via POST', () => {
  const updatedtask: updatedTask = {
    Task_ID:1,
    Task: 'Test Task Update',  
    Priority: 10,
    Parent_Task: 'Parent Test Task Update',
    Parent_ID: 1,
    Start_Date: new Date(2019,7,6),
    End_Date: new Date(2019,7,7)
    }
    service.updateTask(updatedtask).subscribe(posts => {
    });
    const request=httpMock.expectOne(`${service.url}/`);
    expect(request.request.method).toBe('POST');
    request.flush(updatedtask);
});

it('should pass specific task to be ended to API by endTask method via POST', () => {
  const endtask: endTask = {
    Task_ID:1,
    IsActive: 'N'
    }
    service.endTask(endtask).subscribe(posts => {
    });
    const request=httpMock.expectOne(`${service.url}/`);
    expect(request.request.method).toBe('POST');
    request.flush(endtask);
});

it('should pass specific task id to be deleted to API by deleteTaskById method via DELETE', () => {
  let taskid ="1";
    service.deleteTaskById(taskid).subscribe(posts => {
    });
    const request=httpMock.expectOne(`${service.url}/?id=` + taskid);
    expect(request.request.method).toBe('DELETE');
});

});
