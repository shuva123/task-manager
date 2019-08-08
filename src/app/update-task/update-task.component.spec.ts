import { async, ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';

import { UpdateTaskComponent } from './update-task.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RestserviceService } from '../restservice.service';
import { By } from '@angular/platform-browser';

describe('UpdateTaskComponent', () => {
  let component: UpdateTaskComponent;
  let fixture: ComponentFixture<UpdateTaskComponent>;
  let testBedService: RestserviceService;
  let id: string;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule, FormsModule, RouterTestingModule ],
      declarations: [ UpdateTaskComponent ],
      providers: [RestserviceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTaskComponent);
    component = fixture.componentInstance;
  });

  it('should create update component', () => 
  fakeAsync(() => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  }));

  it('should get task details searched for after Angular calls ngOnInit', () =>
  fakeAsync(() => {
    component.ngOnInit();
    expect(component.tasks).not.toBe(null);
  }));

  it('should call the updateTask service method', () => fakeAsync(() => {
    component.ngOnInit();
    spyOn(testBedService, 'updateTask');
    component.TaskForm.controls['Task'].setValue('Test Task');
    component.TaskForm.controls['Priority'].setValue(12);
    component.TaskForm.controls['Parent_Task'].setValue('Parent Test Task');
    component.TaskForm.controls['Start_Date'].setValue(new Date(2019,7,5));
    component.TaskForm.controls['Parent_Task'].setValue(new Date(2019,7,6));
    fixture.debugElement.query(By.css('.task-form')).triggerEventHandler('submit', null);     
    expect(testBedService.updateTask).toHaveBeenCalled();
  }));
});
