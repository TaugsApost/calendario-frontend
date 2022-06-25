import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VisualizarUsuarioComponent } from './visualizar/visualizar-usuario.component';

const routes: Routes = [
  {
    path: 'visualizar',
    component: VisualizarUsuarioComponent
  },

  {
    path: '',
    redirectTo: 'visualizar',
    pathMatch: 'full'
  }

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
