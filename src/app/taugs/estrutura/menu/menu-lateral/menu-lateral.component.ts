import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {

  itensMenu: MenuItem[] = [];

  @Input() display: boolean = false;
  @Output() fechar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.itensMenu = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home',
        expanded: false,
        command: (event) => {
          this.sair();
        }
      },
      {
        label: 'Calendarios',
        icon: 'pi pi-calendar',
        items: [
          {
            label: 'Meus Calendários',
            routerLink: '/calendario',
            command: (event) => {
              this.sair();
            }
          },
          {
            label: 'Novo Calendário',
            routerLink: '/calendario/novo',
            command: (event) => {
              this.sair();
            }
          }
        ]
      },
      {
        label: 'Compromissos',
        icon: 'pi pi-book',
        items: [
          {
            label: 'Meus Compromissos',
            routerLink: '/compromisso',
            command: (event) => {
              this.sair();
            }
          }
        ]
      },
      {
        label: 'Cadastro',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Meus Dias',
            routerLink: '/cadastro/dia',
            command: (event) => {
              this.sair();
            }
          },
          {
            label: 'Meus Meses',
            routerLink: '/cadastro/mes',
            command: (event) => {
              this.sair();
            }

          }
        ]
      }
    ];
  }
  sair() {
    this.display = false;
    this.fechar.emit();
  }
}
