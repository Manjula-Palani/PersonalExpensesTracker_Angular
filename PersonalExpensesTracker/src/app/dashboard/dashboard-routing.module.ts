import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminGuard } from '../Guard/admin.guard';

const routes: Routes = [
  { path: '', component: UserdashboardComponent },
  { path: 'admin', component: AdmindashboardComponent, canActivate:[AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
