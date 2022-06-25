import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
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
  listaOutrosCalendario: Calendario[] = [];
  listaUsuarios: Usuario[] = [];

  constructor(private service: CalendarioService, private loginService: LoginService, private confirmationService: ConfirmationService,
    private router: Router) {
    this.form = new FormGroup({

    });
  }

  ngOnInit(): void {
    this.criarListas();
  }

  private criarListas() {
    this.criarListaUsuarios();
    this.criarListaCalendarios();

  }

  private criarListaUsuarios() {
    this.loginService.listarUsuarios().subscribe(
      data => {
        this.listaUsuarios = data;
        console.log(this.listaUsuarios);
      }
    );
  }

  private criarListaCalendarios() {
    this.listaCalendario = [];
    this.listaOutrosCalendario = [];
    this.service.listarCalendarios().subscribe(data => {
      data.forEach(calendario => {
        calendario.nomeUsuario = this.returnNomeUser(calendario.idUsuario);
        if (calendario.idUsuario == localStorage.getItem('id_usuario') as unknown) {
          this.listaCalendario.push(calendario);
        } else {
          this.listaOutrosCalendario.push(calendario);
        }
      });
    }
    );
  }

  private returnNomeUser(idUser: number): string {
    let userName: string = '';
    this.listaUsuarios.forEach(u => {
      if (u.id == idUser) {
        userName = u.userName;
      }
    });
    return userName;
  }

  confirmarExcluir(calendario: Calendario) {
    this.confirmationService.confirm({
      message: 'Deseja prosseguir com a operação? Esta ação não poderá ser desfeita',
      header: 'Excluir ' + calendario.configuracao.nome,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excluir(calendario);
      },
      key: 'excluir'
    });
  }

  excluir(calendario: Calendario) {
    this.service.excluirCalendario((calendario.id) as any).subscribe(
      data => {
        this.criarListaCalendarios();
        this.confirmationService.confirm({
          message: 'Registro excluido com sucesso',
          header: 'Excluido',
          icon: 'pi pi-exclamation-triangle',
          rejectVisible: false,
          key: 'excluir',
          acceptLabel: 'Ok'
        });
      }
    );
  }

  verConfiguracao(calendario: Calendario) {
    this.router.navigate(['calendario/configuracao/' + calendario.id]);
  }

}
