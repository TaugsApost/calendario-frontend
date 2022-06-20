import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/estrutura/login/login.service';
import { Usuario, UsuarioFilter } from 'src/app/usuario/shared/usuario.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: Usuario = new Usuario;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    let user: UsuarioFilter = new UsuarioFilter;
    user.userName = localStorage.getItem('usuario') as string;
    this.loginService.consultarPorUserName(user).subscribe(
      data => {
        this.user = data;
      }
    );
  }

}
