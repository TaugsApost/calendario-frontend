import { NgModule } from "@angular/core";
import { HeaderModule } from "./estrutura/header/header.module";
import { MenuTopModule } from "./estrutura/menu/menu-top/menu-top.module";
import { TabelaComponent } from './tabela/tabela.component';
import { TabelaModule } from "./tabela/tabela.module";

@NgModule({
  exports: [
    HeaderModule,
    MenuTopModule,
    TabelaModule
  ]
})
export class TaugsModule { }