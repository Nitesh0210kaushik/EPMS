import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { SharedModule } from '../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [DashboardHomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgxChartsModule,
  ],
})
export class DashboardModule {
  logout() {}
}
