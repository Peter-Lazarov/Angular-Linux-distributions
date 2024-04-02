import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemDetailsComponent } from './system-details/system-details.component';
import { SystemAllComponent } from './system-all/system-all.component';
import { SystemAddComponent } from './system-add/system-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemRoutingModule } from './system-routing.module';


@NgModule({
  declarations: [
    SystemDetailsComponent,
    SystemAllComponent,
    SystemAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SystemRoutingModule,
    ReactiveFormsModule
  ]
})
export class SystemModule { }
