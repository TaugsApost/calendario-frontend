import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PrimengModule } from "src/app/shared/primeng.module";
import { TabelaComponent } from "./tabela.component";

@NgModule({
    imports: [
        PrimengModule,
        CommonModule
    ],
    declarations: [
        TabelaComponent
    ],
    exports: [
        TabelaComponent
    ]
})
export class TabelaModule { }