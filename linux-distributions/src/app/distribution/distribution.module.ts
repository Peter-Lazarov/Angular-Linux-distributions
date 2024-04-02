import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistributionAddComponent } from './distribution-add/distribution-add.component';
import { FormsModule } from '@angular/forms';
import { DistributionRoutingModule } from './distribution-routing.module';
import { DistributionDetailsComponent } from './distribution-details/distribution-details.component';
import { DistributionAllComponent } from './distribution-all/distribution-all.component';


@NgModule({
  declarations: [
    DistributionAddComponent,
    DistributionDetailsComponent,
    DistributionAllComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DistributionRoutingModule
  ]
})
export class DistributionModule { }
