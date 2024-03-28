import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemDetailsComponent } from './system-details/system-details.component';
import { SystemAllComponent } from './system-all/system-all.component';
import { SystemAddComponent } from './system-add/system-add.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SystemRoutingModule } from './system-routing.module';
import { EnvironmentService } from '../environment/environment.service';

@NgModule({
  declarations: [
    SystemDetailsComponent,
    SystemAllComponent,
    SystemAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SystemRoutingModule
  ]
})
export class SystemModule { }
