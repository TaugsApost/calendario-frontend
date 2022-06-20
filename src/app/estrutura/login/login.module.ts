import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PrimengModule } from "src/app/shared/primeng.module";
import { CriarContaComponent } from "./criar-conta/criar-conta.component";
import { LogarContaComponent } from "./logar-conta/logar-conta.component";
import { LoginRoutingModule } from "./login-routing.module";
import { VisualizarContaComponent } from "./visualizar-conta/visualizar-conta.component";

@NgModule({
    imports: [
        LoginRoutingModule,
        FormsModule,
        PrimengModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        CriarContaComponent,
        LogarContaComponent,
        VisualizarContaComponent
    ]
})

export class LoginModule { }