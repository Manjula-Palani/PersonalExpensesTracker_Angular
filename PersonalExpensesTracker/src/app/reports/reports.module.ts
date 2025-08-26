import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsViewComponent } from './reports-view/reports-view.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    ReportsViewComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NgChartsModule
  ]
})
export class ReportsModule { }
