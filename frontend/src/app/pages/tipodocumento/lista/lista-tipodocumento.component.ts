import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Tipodocumento } from 'src/app/models/tipodocumento';
import { TipodocumentoService } from 'src/app/service/tipodocumento.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-tipodocumento',
  templateUrl: './lista-tipodocumento.component.html',
  styleUrls: ['./lista-tipodocumento.component.css']
})
export class ListaTipoDocumentoComponent implements OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();
  tipos: Tipodocumento[] = [];
  roles: string[];
  isAdmin = false;
  constructor(
    private tipodocumentoService: TipodocumentoService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarTipos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  cargarTipos(): void {
    this.tipodocumentoService.list()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tipos: Tipodocumento[]) => {
        this.tipos = tipos;
      },
        err => {
          this.handleWrongResponse();
        });
  }


  handleWrongResponse() {
    this.toastr.error('Error Inesperado', 'Fail', {
      timeOut: 3000, positionClass: 'toast-top-right',
    });
  }


  crear() {
    this.router.navigate(['tipodocumento/crear']);
  }

  ver(id_tipo_comprobante: number) {
    this.router.navigate(['tipodocumento/ver/' + id_tipo_comprobante]);
  }

  editar(id_tipo_comprobante: number) {
    this.router.navigate(['tipodocumento/editar/' + id_tipo_comprobante]);
  }

  borrar(id_tipo_comprobante: number, nombre: string) {
    Swal.fire({
      title: 'Inhabilitar',
      text: '¿Desea inhabilitar tipo de documento ' + nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipodocumentoService.disabled(id_tipo_comprobante)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((res: any) => {
            this.handleSuccessResponse(nombre);
            this.cargarTipos();
          },
            err => {
              this.handleWrongResponse();
            });

      } else if (result.isDenied) {
        Swal.fire('Sin cambios', '', 'info')
      }
    })

  }

  handleSuccessResponse(nombre: string) {
    Swal.fire('Tipo documento ' + nombre + ' inhabilitado', '', 'success')
    this.router.navigate(['tipodocumento/listar']);
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
