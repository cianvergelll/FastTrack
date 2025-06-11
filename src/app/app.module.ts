import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './components/about/about.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';
import { CalendarManagerComponent } from './components/calendar-manager/calendar-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TaskManagerComponent,
    CalendarManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
