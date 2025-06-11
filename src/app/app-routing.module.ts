import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';
import { CalendarManagerComponent } from './components/calendar-manager/calendar-manager.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent, title: 'About Us' },
  { path: 'task-manager', component: TaskManagerComponent, title: 'Task Manager' },
  { path: 'calendar-manager', component: CalendarManagerComponent, title: 'Calendar Manager' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
