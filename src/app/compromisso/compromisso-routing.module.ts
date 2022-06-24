import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListarCompromissoComponent } from './listar/listar-compromisso.component';
import { ManterCompromissoComponent } from './manter/manter-compromisso.component';
import { VisualizarCompromissoComponent } from './visualizar/visualizar-compromisso.component';



const routes: Routes = [
  {
    path: 'listar',
    component: ListarCompromissoComponent
  },
  {
    path: 'novo',
    component: ManterCompromissoComponent
  },
  {
    path: 'novo/:id',
    component: ManterCompromissoComponent
  },
  {
    path: 'visualizar/:id',
    component: VisualizarCompromissoComponent
  },

  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompromissoRoutingModule { }
