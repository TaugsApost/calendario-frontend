import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/estrutura/login/login.service';
import { Usuario, UsuarioFilter } from 'src/app/usuario/shared/usuario.model';
import { Calendario } from '../shared/calendario.model';
import { CalendarioService } from '../shared/calendario.service';

@Component({
  selector: 'app-listar-calendario',
  templateUrl: './listar-calendario.component.html',
  styleUrls: ['./listar-calendario.component.scss']
})
export class ListarCalendarioComponent implements OnInit {

  form: FormGroup;
  listaCalendario: Calendario[] = [];

  constructor(private service: CalendarioService, private loginService: LoginService) {
    this.form = new FormGroup({

    });
  }

  ngOnInit(): void {
    this.criarListas();
  }

  private criarListas() {
    let user: UsuarioFilter = new UsuarioFilter();
    user.userName = localStorage.getItem('usuario') as string;
    this.loginService.consultarPorUserName(user).subscribe(
      data => {
        this.criarListaCalendarios(data);
      }
    );

  }

  private criarListaCalendarios(user: Usuario) {
    this.service.listarCalendarios(user).subscribe(data => {
      data.forEach(calendario => {
        this.listaCalendario.push(calendario);
      });
    }
    );
  }

}
