import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PrimengModule } from "../shared/primeng.module";
import { TabelaModule } from "../taugs/tabela/tabela.module";
import { CalendarioRoutingModule } from "./calendario-routing.module";
import { ListarCalendarioComponent } from "./listar/listar-calendario.component";
import { ManterCalendarioComponent } from "./manter/manter-calendario.component";
import { CalendarioService } from "./shared/calendario.service";
import { VisualizarCalendarioComponent } from "./visualizar/visualizar-calendario.component";
import { DetalheCalendarioComponent } from './listar/detalhe-calendario/detalhe-calendario.component';
import { ViewDataComponent } from './visualizar/view-data/view-data.component';
import { ViewConfigComponent } from './visualizar/view-config/view-config.component';
import { ViewDetalheDataComponent } from './visualizar/view-detalhe-data/view-detalhe-data.component';

@NgModule({
    imports: [
        PrimengModule,
        CommonModule,
        ReactiveFormsModule,
        TabelaModule,
        CalendarioRoutingModule
    ],
    declarations: [
        ManterCalendarioComponent,
        VisualizarCalendarioComponent,
        ListarCalendarioComponent,
        DetalheCalendarioComponent,
        ViewDataComponent,
        ViewConfigComponent,
        ViewDetalheDataComponent
    ],
    providers: [
        CalendarioService
    ],
    exports: [
        DetalheCalendarioComponent,
        ViewDataComponent,
        ViewDetalheDataComponent,
    ]
})
export class CalendarioModule { }
