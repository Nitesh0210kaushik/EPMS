import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../core/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm = '';
  role: string | null = '';

  sortKey: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    if (isPlatformBrowser(this.platformId)) {
      this.role = localStorage.getItem('role');
    }
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
      this.filteredUsers = [...res];
      this.search();
    });
  }

  search(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(
      (u) =>
        u.email.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term)
    );
    this.applySort();
  }

  sortBy(key: string): void {
    if (this.sortKey === key) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortOrder = 'asc';
    }
    this.applySort();
  }

  applySort(): void {
    if (!this.sortKey) return;

    this.filteredUsers = [...this.filteredUsers].sort((a, b) => {
      const valA = a[this.sortKey]?.toLowerCase?.() || '';
      const valB = b[this.sortKey]?.toLowerCase?.() || '';

      return this.sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }

  deleteUser(id: string): void {
    if (confirm('Delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  editUser(id: string): void {
    this.router.navigate(['/users/edit', id]);
  }

  createUser(): void {
    this.router.navigate(['/users/create']);
  }

  resetPassword(user: any): void {
    alert(`Password reset link sent to ${user.email}`);
  }

  changeRole(user: any, newRole: string): void {
    this.userService
      .updateUser(user.id, { ...user, role: newRole })
      .subscribe(() => this.loadUsers());
  }
}
