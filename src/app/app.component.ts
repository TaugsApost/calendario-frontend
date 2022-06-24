import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoginService } from './estrutura/login/login.service';
import { Usuario, UsuarioFilter } from './usuario/shared/usuario.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AppComponent implements OnInit {

  loginService: LoginService;
  user: Usuario = new Usuario;


  constructor(loginService: LoginService) {
    this.loginService = loginService;
    let user: UsuarioFilter = new UsuarioFilter();
    user.userName = localStorage.getItem('usuario') as string;
    this.loginService.consultarPorUserName(user).subscribe(
      response => this.user = response
    );
  }
  ngOnInit(): void {

  }

  title = 'Calendario-frontend';
}
