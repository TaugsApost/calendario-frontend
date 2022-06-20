import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/estrutura/login/login.service';
import { UsuarioFilter } from 'src/app/usuario/shared/usuario.model';
import { Mes } from '../../shared/cadastro.model';
import { CadastroService } from '../../shared/cadastro.service';

@Component({
  selector: 'modal-salvar-mes',
  templateUrl: './modal-salvar.component.html',
  styleUrls: ['./modal-salvar.component.scss'],
  providers: [MessageService]
})
export class ModalSalvarMesComponent implements OnInit {

  @Input() mes: Mes = new Mes();
  @Input() display: boolean = false;

  @Output() desativar: EventEmitter<any> = new EventEmitter();

  formSalvar: FormGroup;
  idUser: number = 0;

  constructor(private loginService: LoginService, private service: CadastroService, private messageService: MessageService) {
    this.formSalvar = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl(null, Validators.required),
      sigla: new FormControl(null, Validators.required),
      idUsuario: new FormControl(),
    })
  }

  ngOnInit(): void {
    let user: UsuarioFilter = new UsuarioFilter();
    user.userName = localStorage.getItem('usuario') as string;
    this.loginService.consultarPorUserName(user).subscribe(
      data => this.idUser = data.id
    );
  }

  carregarDia() {
    if (this.mes) {
      const id = this.mes.id;
      this.service.detalharMes(id).subscribe(
        data => this.formSalvar.patchValue(data)
      )
    }
  }

  salvar() {
    this.formSalvar.controls['idUsuario'].setValue(this.idUser);
    if (this.formSalvar.valid) {
      this.service.salvarMes(this.formSalvar.getRawValue()).subscribe(
        data => {
          console.log('response', data);
          this.messageService.add({ severity: 'success', summary: 'Salvo', detail: 'Mes salvo com sucesso!' });
          this.display = false;
        }
      )
    } else {
      this.showError("Erro", "Campo Obrigatorio Nulo");
    }
    //this.paginaListar();
  }

  private showError(titulo: string, msg: string) {
    this.messageService.add({ severity: 'error', summary: titulo, detail: msg });
  }
  voltar() {
    //this.display = false;
    this.desativar.emit()
  }

}
