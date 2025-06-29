import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../core/core/services/task.service';
import { ProjectService } from '../../../core/core/services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isEdit = false;
  projectId!: number;
  // taskId!: number;
  taskId!: string;

  projectName: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private projectService: ProjectService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      const id = queryParams.get('projectId');
      if (id) {
        this.projectId = +id;
        this.loadProjectName();
      }

      this.route.paramMap.subscribe((params) => {
        const tid = params.get('id');
        this.taskId = tid || '';
        this.isEdit = !!this.taskId;

        this.initForm();

        if (this.isEdit) {
          this.loadTaskDetails();
        }
      });
    });
  }

  loadProjectName(): void {
    this.projectService.getProjectById(this.projectId).subscribe((project) => {
      this.projectName = project?.name || '';
    });
  }

  loadTaskDetails(): void {
    this.taskService.getTask(this.taskId).subscribe((task) => {
      this.taskForm.patchValue(task);
    });
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['To Do', Validators.required],
      projectId: [this.projectId],
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const taskData = this.taskForm.value;

    if (this.isEdit) {
      this.taskService.updateTask(this.taskId, taskData).subscribe((res) => {
        if (res) {
          this.toastrService.success('Task Updated Successfully');
          this.router.navigate([`/tasks`]);
        }
      });
    } else {
      this.taskService.addTask(taskData).subscribe((res) => {
        if (res) {
          this.toastrService.success('Task created successfully');
          this.router.navigate([`/tasks`]);
        }
      });
    }
  }
}
