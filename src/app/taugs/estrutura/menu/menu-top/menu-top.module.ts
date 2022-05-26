import { NgModule } from "@angular/core";
import { PrimengModule } from "src/app/shared/primeng.module";
import { MenuTopComponent } from "./menu-top.component";
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        PrimengModule,
        CommonModule
    ],
    declarations: [
        MenuTopComponent,
        BreadcrumbComponent
    ],
    exports: [
        MenuTopComponent,
        BreadcrumbComponent
    ]
})
export class MenuTopModule { }