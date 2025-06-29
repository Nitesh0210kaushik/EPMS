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
  projects: any[] = [];
  tasksByProject: { [projectId: number]: any[] } = {};

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.loadProjectsWithTasks();
  }

  loadProjectsWithTasks(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
      this.projects.forEach((project) => {
        this.taskService.getTasksByProject(project.id).subscribe((tasks) => {
          this.tasksByProject[project.id] = tasks;
        });
      });
    });
  }

  addTask(projectId: number) {
    this.router.navigate([`/tasks/create`], {
      queryParams: { projectId },
    });
  }

  drop(event: CdkDragDrop<string[]>, projectId: number) {
    moveItemInArray(
      this.tasksByProject[projectId],
      event.previousIndex,
      event.currentIndex
    );
  }

  updateStatus(task: any, newStatus: string) {
    const updatedTask = { ...task, status: newStatus };
    this.taskService.updateTask(task.id, updatedTask).subscribe(() => {
      task.status = newStatus;
    });
  }
}
