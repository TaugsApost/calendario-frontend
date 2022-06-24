import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/usuario/shared/usuario.model';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.scss']
})
export class CriarContaComponent implements OnInit {

  formCriar: FormGroup;
  erro = false;
  sucesso = false;
  formInvalido = false;
  listaUsuarios: Usuario[] = [];

  constructor(private service: LoginService, private router: Router) {
    this.formCriar = new FormGroup({
      userName: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      id: new FormControl(null)
    });
    //this.formCriar.reset();
  }

  ngOnInit(): void {
    this.criarListaUsuarios();
  }

  criarConta() {
    if (this.formCriar.valid) {
      let verificador: Usuario[] = this.listaUsuarios.filter(u => u.userName === this.formCriar.controls['userName'].value);
      if (verificador.length == 0) {
        this.sucesso = true
        this.service.salvar(this.formCriar.getRawValue()).subscribe(
          data => {
            this.sucesso = true;
          }
        );
      } else {
        this.erro = true;
      }
    } else {
      this.formInvalido = true;
    }
  }

  criarListaUsuarios() {
    this.service.listarUsuarios().subscribe(
      data => {
        this.listaUsuarios = data;
        this.formCriar.reset();
      }
    );

  }

  voltar() {
    this.router.navigate(['login/logar']);
  }

}
