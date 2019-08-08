import { async, ComponentFixture, TestBed, inject, fakeAsync} from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { RestserviceService } from '../restservice.service';
import { By } from '@angular/platform-browser';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let testBedService: RestserviceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule,HttpClientModule, RouterTestingModule ],
      declarations: [ AddTaskComponent ],
      providers: [RestserviceService,FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    testBedService=TestBed.get(RestserviceService);
    fixture.detectChanges();
  });

  it('should create add task component', () => {
    expect(component).toBeTruthy();
  });

  it('service injected via inject(..) and TestBed.get(..) should be same', () => {
    inject([RestserviceService],(injectservice:RestserviceService) => {
        expect(injectservice).toBe(testBedService);
    });
  });

  it('should call the createTask service method', fakeAsync(() => {

    fixture.detectChanges();
    spyOn(testBedService, 'createTask');
    component.TaskForm.controls['Task'].setValue('Test Task');
    component.TaskForm.controls['Priority'].setValue(12);
    component.TaskForm.controls['Parent_Task'].setValue('Parent Test Task');
    component.TaskForm.controls['Start_Date'].setValue(new Date(2019,7,5));
    component.TaskForm.controls['Parent_Task'].setValue(new Date(2019,7,6));

    fixture.debugElement.query(By.css('.task-form')).triggerEventHandler('submit', null);     

    expect(testBedService.createTask).toHaveBeenCalled();
  }));

});
