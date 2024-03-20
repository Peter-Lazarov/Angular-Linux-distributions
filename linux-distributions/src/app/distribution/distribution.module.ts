import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistributionDetailsComponent } from './distribution-details/distribution-details.component';
import { DistributionAllComponent } from './distribution-all/distribution-all.component';



@NgModule({
  declarations: [
    DistributionDetailsComponent,
    DistributionAllComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DistributionModule { }
