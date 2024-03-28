import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EnvironmentAddComponent } from "./environment-add/environment-add.component";


const routes: Routes = [
    //{ path: '', component: },
    { path: 'add', component: EnvironmentAddComponent },
    //{ path: ':id', component: SystemDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EnvironmentRoutingModule { }
