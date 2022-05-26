import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PrimengModule } from "../shared/primeng.module";
import { TabelaModule } from "../taugs/tabela/tabela.module";
import { CadastroRoutingModule } from "./cadastro-routing.module";
import { DiaComponent } from './dia/dia.component';
import { MesComponent } from './mes/mes.component';
import { CadastroService } from "./shared/cadastro.service";

@NgModule({
    imports: [
        PrimengModule,
        CommonModule,
        ReactiveFormsModule,
        CadastroRoutingModule,
        TabelaModule
    ],
    declarations: [
        DiaComponent,
        MesComponent
    ],
    providers: [
        CadastroService
    ]
})
export class CadastroModule { }