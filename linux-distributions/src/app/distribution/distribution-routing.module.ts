import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DistributionAddComponent } from "./distribution-add/distribution-add.component";
import { DistributionDetailsComponent } from "./distribution-details/distribution-details.component";
import { DistributionAllComponent } from "./distribution-all/distribution-all.component";
import { AuthenticationActivate } from "../guards/authentication.activate";


const routes: Routes = [
    { path: '', component: DistributionAllComponent},
    { path: 'add', component: DistributionAddComponent, canActivate: [AuthenticationActivate] },
    { path: ':id/details', component: DistributionDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DistributionRoutingModule { }
