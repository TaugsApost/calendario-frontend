import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { CriarContaComponent } from "./criar-conta/criar-conta.component"
import { LogarContaComponent } from "./logar-conta/logar-conta.component"
import { VisualizarContaComponent } from "./visualizar-conta/visualizar-conta.component"

const routes: Routes = [
    {
        path: 'logar',
        component: LogarContaComponent
    },
    {
        path: 'criarConta',
        component: CriarContaComponent
    },
    {
        path: 'visualizarConta',
        component: VisualizarContaComponent
    },
    {
        path: '',
        redirectTo: 'logar',
        pathMatch: 'full'
    }

]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {

}