import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSphereComponent } from './home-sphere/home-sphere.component';
// import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: HomeSphereComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
