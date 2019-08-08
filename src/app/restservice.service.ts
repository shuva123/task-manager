import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Task } from './task';
import { updatedTask } from './UpdatedTask';
import { endTask } from './endTask';

@Injectable({
  providedIn: 'root'
})
export class RestserviceService {

  url = 'http://172.18.2.172:7657/api/Task_';  
  constructor(private http: HttpClient) { }  
  getAllTask():Observable<Task[]> {  
    return this.http.get<Task[]>(this.url + '/');  
   }
  getTaskById(taskId: string): Observable<Task> {  
    return this.http.get<Task>(this.url + '/' + taskId);  
  }  
  createTask(task: Task): Observable<Task[]> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Task[]>(this.url + '/',  
    task, httpOptions);  
  }  
  updateTask(task: updatedTask): Observable<updatedTask[]> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<updatedTask[]>(this.url + '/',  
    task, httpOptions);  
  }
  
  endTask(task: endTask): Observable<endTask[]> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<endTask[]>(this.url + '/',  
    task, httpOptions);  
  }
  deleteTaskById(taskId: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Tdd:ype': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/?id=' + taskId, httpOptions);  
  }
}
