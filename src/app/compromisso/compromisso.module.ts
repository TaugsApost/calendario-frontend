import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCompromissoComponent } from './listar/listar-compromisso.component';
import { VisualizarCompromissoComponent } from './visualizar/visualizar-compromisso.component';
import { ManterCalendarioComponent } from '../calendario/manter/manter-calendario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../shared/primeng.module';
import { TabelaModule } from '../taugs/tabela/tabela.module';
import { ManterCompromissoComponent } from './manter/manter-compromisso.component';
import { CompromissoRoutingModule } from './compromisso-routing.module';



@NgModule({
  declarations: [
    ManterCompromissoComponent,
    ListarCompromissoComponent,
    VisualizarCompromissoComponent,

  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    TabelaModule,
    CompromissoRoutingModule
  ]
})
export class CompromissoModule { }
