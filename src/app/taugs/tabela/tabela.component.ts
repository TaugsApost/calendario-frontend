import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  @Input() dataSource: any;
  @Input() columns: any;
  @Input() titulo: any
  @Input() tooltip: string = '';
  @Input() habVisualizar: boolean = true;
  @Input() habDeletar: boolean = true;
  @Input() habEditar: boolean = true;

  @Output() deletar = new EventEmitter<any>();
  @Output() visualizar = new EventEmitter<any>();
  @Output() editar = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  botaoDeletar(item: any) {
    this.deletar.emit(item)
  }
  botaoVisualizar(item: any) {
    this.visualizar.emit(item)
  }
  botaoEditar(item: any) {
    this.editar.emit(item)
  }

}
