import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PrimengModule } from "../shared/primeng.module";
import { TabelaModule } from "../taugs/tabela/tabela.module";
import { CadastroRoutingModule } from "./cadastro-routing.module";
import { DiaComponent } from './dia/dia.component';
import { MesComponent } from './mes/mes.component';
import { CadastroService } from "./shared/cadastro.service";
import { ModalDeletarComponent } from './dia/modal-deletar/modal-deletar.component';
import { ModalSalvarComponent } from './dia/modal-salvar/modal-salvar.component';
import { ModalVisualizarComponent } from './dia/modal-visualizar/modal-visualizar.component';
import { ModalDeletarMesComponent } from "./mes/modal-deletar/modal-deletar.component";
import { ModalVisualizarMesComponent } from "./mes/modal-visualizar/modal-visualizar.component";
import { ModalSalvarMesComponent } from "./mes/modal-salvar/modal-salvar.component";

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
        MesComponent,
        ModalDeletarComponent,
        ModalSalvarComponent,
        ModalVisualizarComponent,
        ModalDeletarMesComponent,
        ModalVisualizarMesComponent,
        ModalSalvarMesComponent
    ],
    providers: [
        CadastroService
    ],
    exports: [
        ModalDeletarComponent,
        ModalSalvarComponent,
        ModalVisualizarComponent
    ]
})
export class CadastroModule { }