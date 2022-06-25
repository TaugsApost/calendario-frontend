import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarUsuarioComponent } from './visualizar/visualizar-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../shared/primeng.module';
import { TabelaModule } from '../taugs/tabela/tabela.module';
import { UsuarioRoutingModule } from './usuario-routing.module';

@NgModule({
  declarations: [
    VisualizarUsuarioComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    TabelaModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
