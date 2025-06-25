import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectComponent } from './components/project/project.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProjectComponent, ProjectFormComponent],
  imports: [CommonModule, ProjectsRoutingModule, SharedModule],
})
export class ProjectsModule {}
