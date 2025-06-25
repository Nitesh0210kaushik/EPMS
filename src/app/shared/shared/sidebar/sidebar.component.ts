import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  role = localStorage.getItem('role');
  constructor(private router: Router) {}

  goTo(path: string) {
    console.log('path', path);
    this.router.navigate([`/${path}`]);
  }
}
