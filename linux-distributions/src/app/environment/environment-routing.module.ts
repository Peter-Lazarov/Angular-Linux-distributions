import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EnvironmentAddComponent } from "./environment-add/environment-add.component";
import { EnvironmentDetailsComponent } from "./environment-details/environment-details.component";
import { EnvironmentAllComponent } from "./environment-all/environment-all.component";
import { AuthenticationActivate } from "../guards/authentication.activate";


const routes: Routes = [
    { path: '', component: EnvironmentAllComponent },
    { path: 'add', component: EnvironmentAddComponent, canActivate: [AuthenticationActivate]},
    { path: ':id/details', component: EnvironmentDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EnvironmentRoutingModule { }
