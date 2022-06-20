import { NgModule } from "@angular/core";
import { PrimengModule } from "src/app/shared/primeng.module";
import { MenuLateralModule } from "../menu/menu-lateral/menu-lateral.module";
import { HeaderComponent } from "./header.component";


@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        PrimengModule,
        MenuLateralModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule { }