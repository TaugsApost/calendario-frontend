import { NgModule } from "@angular/core";
import { PrimengModule } from "src/app/shared/primeng.module";
import { CommonModule } from "@angular/common";
import { MenuLateralComponent } from "./menu-lateral.component";

@NgModule({
    imports: [
        PrimengModule,
        CommonModule
    ],
    declarations: [
        MenuLateralComponent,
    ],
    exports: [
        MenuLateralComponent
    ]
})
export class MenuLateralModule { }