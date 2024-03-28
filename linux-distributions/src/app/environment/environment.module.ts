import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentAddComponent } from './environment-add/environment-add.component';
import { FormsModule } from '@angular/forms';
import { EnvironmentRoutingModule } from './environment-routing.module';
import { EnvironmentService } from './environment.service';

@NgModule({
  declarations: [
    EnvironmentAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EnvironmentRoutingModule
  ],

})
export class EnvironmentModule { }
