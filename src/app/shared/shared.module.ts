import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HighlightDirective } from './shared/highlight.directive';
import { DateFormatPipe } from './shared/date-format.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    HighlightDirective,
    DateFormatPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
