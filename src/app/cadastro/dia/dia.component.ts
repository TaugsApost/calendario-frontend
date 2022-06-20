import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/estrutura/login/login.service';
import { UsuarioFilter } from 'src/app/usuario/shared/usuario.model';
import { Dia } from '../shared/cadastro.model';
import { CadastroService } from '../shared/cadastro.service';

@Component({
  selector: 'app-dia',
  templateUrl: './dia.component.html',
  styleUrls: ['./dia.component.scss'],
  providers: [MessageService]
})
export class DiaComponent implements OnInit {

  listaDias: Dia[] = [];
  form: FormGroup;
  dataSource: any;
  columns: any[] = [];

  displayVisualizar: boolean = false;
  displaySalvar: boolean = false;
  displayDeletar: boolean = false;

  objVisualizar: any;
  objSalvar: Dia = new Dia();
  objDeletar: Dia = new Dia();

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
        value: 'sigla',
      },
      {
        value: 'actions',
        align: 'center',
        size: '100%'

      }
    ]
    this.service.listarDias().subscribe(data => {
      data.forEach(dia => {
        this.listaDias.push(dia);
      });
    });
  }

  pesquisar() {
    let idUser = localStorage.getItem('id_usuario');
    this.form.controls['idUser'].setValue(idUser);
    console.log(this.form.controls['idUser'].value);
    this.service.consultarDias(this.form.getRawValue()).subscribe(
      data => {
        this.dataSource = data;
      }
    );
  }

  visualizar(dia: any) {
    this.objVisualizar = dia;
    this.displayVisualizar = true;
    console.log(dia);
  }

  resetarSalvar() {
    this.objSalvar = new Dia();
    this.displaySalvar = false;
  }

  limpar() {
    this.form.reset();
    this.dataSource = [];
  }

  excluir() {
    console.log(this.objDeletar.id)
    this.service.excluirDia(this.objDeletar.id).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Excluir', detail: 'Dia excluido com sucesso!' });
      this.pesquisar();
      this.displayDeletar = false;
    });

  }

}
