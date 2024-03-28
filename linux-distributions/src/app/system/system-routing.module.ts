import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SystemAllComponent } from "./system-all/system-all.component";
import { SystemAddComponent } from "./system-add/system-add.component";
import { SystemDetailsComponent } from "./system-details/system-details.component";

const routes: Routes = [
    { path: '', component: SystemAllComponent },
    { path: 'add', component: SystemAddComponent },
    { path: ':id', component: SystemDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SystemRoutingModule { }
