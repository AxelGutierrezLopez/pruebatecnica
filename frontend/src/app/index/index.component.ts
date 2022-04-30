import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLogged = false;
  nombreUsuario = '';

  constructor(
    private tokenService: TokenService,
    private router: Router
    ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }
  }

  tipodocumento(){
    this.router.navigate(['tipodocumento/listar']);
  }

  tipocontribuyente(){
    this.router.navigate(['tipocontribuyente/listar']);
  }

  entidad(){
    this.router.navigate(['entidad/listar']);
  }


}
