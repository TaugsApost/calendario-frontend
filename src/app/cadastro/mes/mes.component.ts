import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/estrutura/login/login.service';
import { UsuarioFilter } from 'src/app/usuario/shared/usuario.model';
import { Mes } from '../shared/cadastro.model';
import { CadastroService } from '../shared/cadastro.service';

@Component({
  selector: 'app-mes',
  templateUrl: './mes.component.html',
  styleUrls: ['./mes.component.scss'],
  providers: [MessageService]
})
export class MesComponent implements OnInit {

  listaMeses: Mes[] = [];
  form: FormGroup;
  dataSource: any;
  columns: any[] = [];

  displayVisualizar: boolean = false;
  displaySalvar: boolean = false;
  displayDeletar: boolean = false;

  objVisualizar: any;
  objSalvar: Mes = new Mes();
  objDeletar: Mes = new Mes();

  constructor(private service: CadastroService, private messageService: MessageService, private loginService: LoginService) {
    this.form = new FormGroup({
      nome: new FormControl(null),
      sigla: new FormControl(null),
      idUser: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.columns = [
      {
        nome: 'Nome',
        value: 'nome',

      },
      {
        nome: 'Sigla',
        value: 'sigla'
      },
      {
        value: 'actions',
        align: 'center'
      }
    ]
    this.service.listarMeses().subscribe(data => {
      data.forEach(mes => {
        this.listaMeses.push(mes);
      });
    });
  }

  pesquisar() {
    let idUser = localStorage.getItem('id_usuario');
    this.form.controls['idUser'].setValue(idUser);
    console.log(this.form.controls['idUser'].value);
    this.service.consultarMeses(this.form.getRawValue()).subscribe(
      data => {
        this.dataSource = data;
      }
    );
  }

  visualizar(mes: any) {
    this.objVisualizar = mes;
    this.displayVisualizar = true;
    console.log(mes);
  }

  resetarSalvar() {
    this.objSalvar = new Mes();
    this.displaySalvar = false;
  }

  limpar() {
    this.form.reset();
    this.dataSource = [];
  }

  excluir() {
    console.log(this.objDeletar.id)
    this.service.excluirMes(this.objDeletar.id).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Excluir', detail: 'Mes excluido com sucesso!' });
      this.pesquisar();
      this.displayDeletar = false;
    });
  }

}
