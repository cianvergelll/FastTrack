import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';
import { CalendarManagerComponent } from './components/calendar-manager/calendar-manager.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Us',
    canActivate: [AuthGuard]
  },
  {
    path: 'task-manager',
    component: TaskManagerComponent,
    title: 'Task Manager',
    canActivate: [AuthGuard]
  },
  {
    path: 'calendar-manager',
    component: CalendarManagerComponent,
    title: 'Calendar Manager',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }