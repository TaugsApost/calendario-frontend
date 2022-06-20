import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dia } from '../../shared/cadastro.model';

@Component({
  selector: 'modal-deletar',
  templateUrl: './modal-deletar.component.html',
  styleUrls: ['./modal-deletar.component.scss']
})
export class ModalDeletarComponent implements OnInit {

  @Input() dia: Dia = new Dia();
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
