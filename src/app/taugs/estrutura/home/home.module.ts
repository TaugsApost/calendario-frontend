import { NgModule } from "@angular/core";
import { PrimengModule } from "src/app/shared/primeng.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
    imports: [
        HomeRoutingModule,
        PrimengModule
    ],
    declarations: [
        HomeComponent
    ]
})

export class HomeModule { }