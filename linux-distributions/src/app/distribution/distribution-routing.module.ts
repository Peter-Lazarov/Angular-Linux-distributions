import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DistributionAddComponent } from "./distribution-add/distribution-add.component";


const routes: Routes = [
    //{ path: '', component: },
    { path: 'add', component: DistributionAddComponent },
    //{ path: ':id', component: SystemDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DistributionRoutingModule { }
