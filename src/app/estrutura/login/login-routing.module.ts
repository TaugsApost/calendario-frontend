import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AuthGuard } from "../auth/auth.guard"
import { CriarContaComponent } from "./criar-conta/criar-conta.component"
import { LogarContaComponent } from "./logar-conta/logar-conta.component"
import { VisualizarContaComponent } from "./visualizar-conta/visualizar-conta.component"

const routes: Routes = [
    {
        path: 'logar',
        component: LogarContaComponent,
        canLoad: [AuthGuard]
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
        pathMatch: 'full',
        canLoad: [AuthGuard]
    }

]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {

}