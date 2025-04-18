import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './Modules/admin-home/admin-home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard/home', pathMatch: 'full' }, // Load dashboard/home first
  { path: 'auth', loadChildren: () => import('./Modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin/home', loadChildren: () => import('./Modules/admin-home/admin-home.module').then(m => m.AdminHomeModule) },
  { path: 'dashboard/home', loadChildren: () => import('./Modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'admin/home', component: AdminHomeComponent, canActivate: [AuthGuard] } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
