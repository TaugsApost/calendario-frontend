import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './estrutura/auth/auth.guard';
import { HomeModule } from './taugs/estrutura/home/home.module';
import { LoginModule } from './estrutura/login/login.module';
import { CadastroModule } from './cadastro/cadastro.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./taugs/estrutura/home/home.module').then(x => HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./estrutura/login/login.module').then(x => LoginModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then(x => CadastroModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
