import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistributionDetailsComponent } from './distribution/distribution-details/distribution-details.component';
import { DistributionAllComponent } from './distribution/distribution-all/distribution-all.component';

const routes: Routes = [
  { path: 'distribution', component: DistributionAllComponent},
  { path: 'distribution/:id', component: DistributionDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
