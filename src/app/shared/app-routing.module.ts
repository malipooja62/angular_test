import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployDashboardComponent } from '../employ-dashboard/employ-dashboard.component';

const routes: Routes = [
  {path: 'employe_dept', component: EmployDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
