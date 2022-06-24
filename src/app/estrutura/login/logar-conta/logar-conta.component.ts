import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioFilter } from 'src/app/usuario/shared/usuario.model';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-logar-conta',
  templateUrl: './logar-conta.component.html',
  styleUrls: ['./logar-conta.component.scss']
})
export class LogarContaComponent implements OnInit {

  invalidLogin = false;
  formLogin: FormGroup;

  constructor(private service: LoginService, private router: Router) {
    this.formLogin = new FormGroup({
      userName: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  logar() {
    this.service.consultarPorUserName(this.formLogin.getRawValue()).subscribe(
      response => {
        let verificar: boolean = this.service.logar(response, this.formLogin.controls['senha'].value);
        if (verificar) {
          this.router.navigate(['']);
        } else {
          this.invalidLogin = true;
        }
      }
    );

  }

  criarConta() {
    this.router.navigate(['login/criarConta']);
  }
}
