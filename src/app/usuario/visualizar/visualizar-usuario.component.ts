import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoginService } from 'src/app/estrutura/login/login.service';
import { Usuario } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-visualizar-usuario',
  templateUrl: './visualizar-usuario.component.html',
  styleUrls: ['./visualizar-usuario.component.scss']
})
export class VisualizarUsuarioComponent implements OnInit {

  userForm: FormGroup;
  readonly: boolean = true;
  editar: boolean = false;
  controls: AbstractControl[] = [];
  listaUsuarios: Usuario[] = [];

  constructor(private service: UsuarioService, private messages: MessageService, private router: Router,
    private loginService: LoginService, private confirmationService: ConfirmationService) {
    this.userForm = new FormGroup({
      id: new FormControl(),
      nome: new FormControl(),
      userName: new FormControl(),
      senha: new FormControl(),
      dias: new FormControl(),
      meses: new FormControl(),
      calendarios: new FormControl(),
      compromissos: new FormControl()
    });
  }

  ngOnInit(): void {
    this.inicializarForm();
    this.criarListaUsuario();
  }

  criarListaUsuario() {
    this.service.listarUsuarios().subscribe(
      data => {
        this.listaUsuarios = data;
      }
    );
  }

  private inicializarForm() {
    this.service.buscar().subscribe(
      data => {
        this.userForm.patchValue(data);
        this.controls = this.controls.concat(this.userForm.controls['nome']);
        this.controls = this.controls.concat(this.userForm.controls['userName']);
        this.controls = this.controls.concat(this.userForm.controls['senha']);
      }
    );
  }

  habilitarEdicao() {
    this.readonly = false;
    this.editar = true;
    for (let c of this.controls) {
      c.setValidators(Validators.required);
    }
  }

  cancelarEdicao() {
    this.userForm.reset();
    for (let c of this.controls) {
      c.clearValidators();
      c.updateValueAndValidity();
    }
    this.readonly = true;
    this.editar = false;
    this.inicializarForm();
  }

  salvar() {
    if (this.userForm.valid) {
      if (this.verificarUsuarioDuplicado(this.userForm.controls['userName'].value, this.userForm.controls['id'].value)) {
        this.service.salvar(this.userForm.getRawValue()).subscribe(
          data => {
            this.messages.add({ severity: 'success', summary: 'Concluído', detail: 'Usuario alterado com sucesso!', closable: true });
            window.localStorage.setItem('usuario', data.userName);
            window.localStorage.setItem('id_usuario', data.id.toString());
            this.cancelarEdicao();
          }
        );
      } else {
        this.messages.add({ severity: 'error', summary: 'Erro', detail: 'Ja existe um usuario com este username', closable: true });
      }
    } else {
      this.messages.add({ severity: 'error', summary: 'Erro', detail: 'Campo obrigatório em branco', closable: true });
    }
  }

  verificarUsuarioDuplicado(username: string, id: number): boolean {
    return (this.listaUsuarios.filter(u => u.userName === username && u.id != id).length == 0)
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  excluirConta() {
    this.service.excluirUsuario(this.userForm.controls['id'].value).subscribe(
      data => {
        this.confirmationService.confirm({
          message: 'Usuario excluido',
          header: 'Excluido',
          icon: 'pi pi-exclamation-triangle',
          rejectVisible: false,
          key: 'normal',
          acceptLabel: 'Ok',
          accept: () => {
            this.logout();
          }
        });
      });
  }

  confirmarExcluir() {
    this.confirmationService.confirm({
      message: 'Deseja prosseguir com a operação? Esta ação não poderá ser desfeita',
      header: 'Excluir ' + this.userForm.controls['userName'].value,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excluirConta();
      },
      key: 'excluir'
    });
  }

}
