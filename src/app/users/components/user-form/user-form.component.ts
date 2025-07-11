import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/core/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEdit = false;
  userId: any;
  role: string | null = '';
  pageTitle = 'Create User';
  isBrowser: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.role = localStorage.getItem('role');
    }

    const idParam = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!idParam;

    if (this.isEdit) {
      this.userId = +idParam!;
      this.pageTitle = 'Edit User';
    }

    this.initForm();

    if (this.isEdit) {
      this.userService.getUser(this.userId).subscribe((user) => {
        this.userForm.patchValue({
          email: user.email,
          role: user.role,
        });

        // Optional: Only allow password change for admin
        if (this.role === 'Admin') {
          this.userForm.patchValue({ password: '' });
        }
      });
    }
  }

  initForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });

    if (this.role === 'Admin') {
      this.userForm.addControl(
        'password',
        this.fb.control('', [Validators.required, Validators.minLength(6)])
      );
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const userData = this.userForm.value;

    if (this.isEdit) {
      this.userService.updateUser(this.userId, userData).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.createUser(userData).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
