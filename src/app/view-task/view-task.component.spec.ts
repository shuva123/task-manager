import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';
import { ViewTaskComponent } from './view-task.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RestserviceService } from '../restservice.service';
import { By } from '@angular/platform-browser';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let testBedService: RestserviceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule, RouterTestingModule, MatTableModule ],
      declarations: [ ViewTaskComponent ],
      providers: [RestserviceService,FormBuilder],
      schemas: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    testBedService=TestBed.get(RestserviceService);
    fixture.detectChanges();
  });

  it('should create viewtask component', () => {
    expect(component).toBeTruthy();
  });

  it('should get task details searched for after Angular calls ngOnInit', () =>
  fakeAsync(() => {
    component.ngOnInit();
    expect(component.allTasks.length).toBeGreaterThan(1);
    expect(component.allTasks).not.toBe(null);
  }));

  it('should call the endTask service method', () => fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(testBedService, 'endTask');
     component.TaskForm.controls['Task_ID'].setValue(1);
    component.TaskForm.controls['IsActive'].setValue('N');

    fixture.debugElement.query(By.css('.btn-end')).triggerEventHandler('submit', null);     

    expect(testBedService.endTask).toHaveBeenCalled();
  }));
});
