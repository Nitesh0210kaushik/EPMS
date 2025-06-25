import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getKpiSummary(): Observable<any> {
    return forkJoin({
      projects: this.http.get<any[]>(`${this.apiUrl}/projects`),
      users: this.http.get<any[]>(`${this.apiUrl}/users`),
      tasks: this.http.get<any[]>(`${this.apiUrl}/tasks`),
    }).pipe(
      map(({ projects, users, tasks }) => {
        const statusMap: { [key: string]: number } = {};

        tasks.forEach((task) => {
          statusMap[task.status] = (statusMap[task.status] || 0) + 1;
        });

        return {
          projectCount: projects.length,
          userCount: users.length,
          overdueTasks: statusMap['To Do'] || 0,
          taskStatusData: Object.entries(statusMap).map(([name, value]) => ({
            name,
            value,
          })),
        };
      })
    );
  }
}
