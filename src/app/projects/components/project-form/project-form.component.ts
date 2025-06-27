import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../core/core/services/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  isEditMode = false;
  projectId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      assignedUsers: [''],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.projectId = +idParam;
      this.projectService
        .getProjectById(this.projectId)
        .subscribe((project) => {
          this.projectForm.patchValue(project);
        });
    }
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      return;
    }

    const projectData = this.projectForm.value;

    if (this.isEditMode) {
      this.projectService
        .updateProject(this.projectId, projectData)
        .subscribe(() => {
          this.router.navigate(['/projects']);
        });
    } else {
      this.projectService.createProject(projectData).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }
}
