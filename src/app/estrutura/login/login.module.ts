import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CriarContaComponent } from "./criar-conta/criar-conta.component";
import { LogarContaComponent } from "./logar-conta/logar-conta.component";
import { LoginRoutingModule } from "./login-routing.module";
import { VisualizarContaComponent } from "./visualizar-conta/visualizar-conta.component";

@NgModule({
    imports:[
       LoginRoutingModule,
       FormsModule
    ],
    declarations:[
        CriarContaComponent,
        LogarContaComponent,
        VisualizarContaComponent
    ]
})

export class LoginModule{}