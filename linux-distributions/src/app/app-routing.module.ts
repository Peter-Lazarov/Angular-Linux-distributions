import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemAllComponent } from './system/system-all/system-all.component';
import { SystemDetailsComponent } from './system/system-details/system-details.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  //{ path: 'system', component: SystemAllComponent},
  //{ path: 'system/:id', component: SystemDetailsComponent},
  { path: 'user', loadChildren: () => import('./user/user.module').then((m) => m.UserModule) },
  { path: 'system', loadChildren: () => import('./system/system.module').then((m) => m.SystemModule) },
  { path: 'environment', loadChildren: () => import('./environment/environment.module').then((m) => m.EnvironmentModule) },
  { path: 'distribution', loadChildren: () => import('./distribution/distribution.module').then((m) => m.DistributionModule) },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
