import { Component } from '@angular/core';
import { ProjectService } from '../../../core/core/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  projects: any[] = [];

  filteredProjects: any[] = [];
  searchTerm: string = '';

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((res) => {
      this.projects = res;
      this.filteredProjects = res;
    });
  }
  search() {}

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProjects = this.projects.filter(
      (project) =>
        project.name.toLowerCase().includes(term) ||
        project.status.toLowerCase().includes(term)
    );
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure to delete this project?')) {
      this.projectService
        .deleteProject(id)
        .subscribe(() => this.loadProjects());
    }
  }

  editProject(id: number): void {
    this.router.navigate(['/projects/edit', id]);
  }

  createProject(): void {
    this.router.navigate(['/projects/create']);
  }
}
