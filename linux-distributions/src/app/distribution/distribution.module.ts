import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistributionAddComponent } from './distribution-add/distribution-add.component';
import { FormsModule } from '@angular/forms';
import { DistributionRoutingModule } from './distribution-routing.module';



@NgModule({
  declarations: [
    DistributionAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DistributionRoutingModule
  ]
})
export class DistributionModule { }
