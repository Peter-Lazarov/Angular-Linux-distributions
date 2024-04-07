import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemDetailsComponent } from './system-details/system-details.component';
import { SystemAllComponent } from './system-all/system-all.component';
import { SystemAddComponent } from './system-add/system-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemRoutingModule } from './system-routing.module';
import { TimeAgoPipe } from '../pipe/date-pipe';


@NgModule({
  declarations: [
    SystemDetailsComponent,
    SystemAllComponent,
    SystemAddComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    SystemRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    TimeAgoPipe
  ]
})
export class SystemModule { }
