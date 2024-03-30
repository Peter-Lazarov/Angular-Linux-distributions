import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentAddComponent } from './environment-add/environment-add.component';
import { FormsModule } from '@angular/forms';
import { EnvironmentRoutingModule } from './environment-routing.module';
import { EnvironmentService } from './environment.service';
import { EnvironmentAllComponent } from './environment-all/environment-all.component';
import { EnvironmentDetailsComponent } from './environment-details/environment-details.component';

@NgModule({
  declarations: [
    EnvironmentAddComponent,
    EnvironmentAllComponent,
    EnvironmentDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EnvironmentRoutingModule
  ],

})
export class EnvironmentModule { }
