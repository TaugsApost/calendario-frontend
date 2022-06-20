import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Mes } from '../../shared/cadastro.model';

@Component({
  selector: 'modal-deletar-mes',
  templateUrl: './modal-deletar.component.html',
  styleUrls: ['./modal-deletar.component.scss']
})
export class ModalDeletarMesComponent implements OnInit {

  @Input() mes: Mes = new Mes();
  @Input() display: boolean = false;

  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() sair: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deletar() {
    this.delete.emit();
  }

  voltar() {
    this.display = false;
    this.sair.emit();
  }

}
