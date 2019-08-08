import { TestBed, async, inject, fakeAsync, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router, Routes, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'} ,
  {path:'add-task', component:AddTaskComponent },
  {path:'view-task', component:ViewTaskComponent },
  {path:'update-task/:id', component:UpdateTaskComponent }
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create app component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'task-manager'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('task-manager');
  });

  it('should render title in a h2 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Task Manager');
  });

  it('should contain a Router Outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(compiled).not.toBe(null);
  });

  it('should have link to Add Component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    let index=compiled.findIndex(de=>de.properties['href']==='/add-task')
    expect(index).toBeGreaterThan(-1);
  });

  it('should have link to view Component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    let index=compiled.findIndex(de=>de.properties['href']==='/view-task')
    expect(index).toBeGreaterThan(-1);
  });
});
