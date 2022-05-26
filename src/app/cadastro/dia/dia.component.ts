import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Dia } from '../shared/cadastro.model';
import { CadastroService } from '../shared/cadastro.service';

@Component({
  selector: 'app-dia',
  templateUrl: './dia.component.html',
  styleUrls: ['./dia.component.scss']
})
export class DiaComponent implements OnInit {

  listaDias: Dia[] = [];
  form: FormGroup;
  dataSource: any;
  columns: any[] = [];

  constructor(private service: CadastroService) {
    this.form = new FormGroup({
      nome: new FormControl(null),
      sigla: new FormControl(null),
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
    this.service.listarDias().subscribe(data => {
      data.forEach(dia => {
        this.listaDias.push(dia);
      });
    });
  }

  pesquisar() {
    this.service.consultarDias(this.form.getRawValue()).subscribe(
      data => {
        this.dataSource = data;
        console.log('response', data);
      }
    )
  }

}
