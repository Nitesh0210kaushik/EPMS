import { Component, OnInit } from '@angular/core';
import { TaskService } from '../core/core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProjectService } from '../core/core/services/project.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.tasks = projects;
    });
  }

  // addTask(projectId: number) {
  //   this.router.navigate([`/tasks/create`]);
  // }
  addTask(projectId: number) {
    this.router.navigate([`/tasks/create`], {
      queryParams: { projectId },
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}
