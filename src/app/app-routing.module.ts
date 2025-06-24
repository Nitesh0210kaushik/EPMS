import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }, { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) }, { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) }, { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }, { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
