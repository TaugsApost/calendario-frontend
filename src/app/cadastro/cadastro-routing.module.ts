import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DiaComponent } from "./dia/dia.component";
import { MesComponent } from "./mes/mes.component";

const routes: Routes = [
    {
        path: 'dia',
        component: DiaComponent
    },
    {
        path: 'mes',
        component: MesComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }

]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CadastroRoutingModule { }