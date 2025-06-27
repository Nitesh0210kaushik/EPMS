import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DashboardService } from '../../services/dashboard.service';
import { log } from 'console';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  // standalone: true,
})
export class DashboardHomeComponent implements OnInit {
  title = 'Dashboard';
  icon = 'dashboard';

  projectCount = 0;
  userCount = 0;
  overdueTasks = 0;
  taskStatusData: any[] = [];

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#42A5F5', '#FFA726', '#66BB6A'],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const child = this.route.firstChild;
        if (child?.snapshot.data['title']) {
          this.title = child.snapshot.data['title'];
          this.icon = child.snapshot.data['icon'];
        }
      });
  }

  ngOnInit(): void {
    this.dashboardService.getKpiSummary().subscribe((data) => {
      console.log('data', data);
      this.projectCount = data.projectCount;
      this.userCount = data.userCount;
      this.overdueTasks = data.overdueTasks;
      this.taskStatusData = data.taskStatusData;
      console.log('Chart Data:', this.taskStatusData);
    });
  }
}
