import { NgModule } from "@angular/core";
import { PrimengModule } from "src/app/shared/primeng.module";
import { HeaderComponent } from "./header.component";


@NgModule({
    declarations:[
        HeaderComponent
    ],
    imports:[
        PrimengModule
    ],
    exports:[
        HeaderComponent
    ]
})
export class HeaderModule{}