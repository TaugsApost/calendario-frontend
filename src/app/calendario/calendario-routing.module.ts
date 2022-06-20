import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListarCalendarioComponent } from "./listar/listar-calendario.component";
import { ManterCalendarioComponent } from "./manter/manter-calendario.component";
import { VisualizarCalendarioComponent } from "./visualizar/visualizar-calendario.component";

const routes: Routes = [
    {
        path: 'listar',
        component: ListarCalendarioComponent
    },
    {
        path: 'novo',
        component: ManterCalendarioComponent
    },
    {
        path: 'visualizar',
        component: VisualizarCalendarioComponent
    },
    {
        path: 'visualizar/:id',
        component: VisualizarCalendarioComponent
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
export class CalendarioRoutingModule { }