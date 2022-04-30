import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Entidad } from 'src/app/models/entidad.';
import { EntidadService } from 'src/app/service/entidad.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-entidad',
  templateUrl: './lista-entidad.component.html',
  styleUrls: ['./lista-entidad.component.css']
})
export class ListaEntidadComponent implements OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();
  entidades: Entidad[] = [];
  roles: string[];
  isAdmin = false;
  constructor(
    private entidadService: EntidadService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarEntidadades();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  cargarEntidadades(): void {
    this.entidadService.list()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((entidad: Entidad[]) => {
        this.entidades = entidad;
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
    this.router.navigate(['entidad/crear']);
  }

  ver(id_tipo_comprobante: number) {
    this.router.navigate(['entidad/ver/' + id_tipo_comprobante]);
  }

  editar(id_tipo_comprobante: number) {
    this.router.navigate(['entidad/editar/' + id_tipo_comprobante]);
  }

  borrar(id_tipo_comprobante: number, nombre: string) {
    Swal.fire({
      title: 'Inhabilitar',
      text: '¿Desea inhabilitar entidad ' + nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entidadService.disabled(id_tipo_comprobante)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((res: any) => {
            this.handleSuccessResponse(nombre);
            this.cargarEntidadades();
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
    Swal.fire('Entidad ' + nombre + ' inhabilitado', '', 'success')
    this.router.navigate(['entidad/listar']);
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
