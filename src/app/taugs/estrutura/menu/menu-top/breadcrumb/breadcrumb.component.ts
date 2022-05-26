import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'taugs-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() caminho: string = '';
  @Input() pagina: string = '';
  @Input() url: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  caminhoInicial() {
    this.caminho = '/Home';
    this.pagina = '';
    this.url = '';
  }

}
