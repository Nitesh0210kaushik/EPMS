import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TasksComponent, TaskFormComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    DragDropModule,
    MatDatepickerModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TasksRoutingModule,
    MatNativeDateModule,
  ],
})
export class TasksModule {}
