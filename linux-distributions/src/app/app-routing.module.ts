import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistributionDetailsComponent } from './distribution/distribution-details/distribution-details.component';
import { DistributionAllComponent } from './distribution/distribution-all/distribution-all.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { path: 'distribution', component: DistributionAllComponent},
  { path: 'distribution/:id', component: DistributionDetailsComponent},
  { path: 'user/register', component: RegisterComponent},
  { path: 'user/login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
