import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TipocontribuyenteService } from 'src/app/service/tipocontribuyente.service';
import { Tipocontribuyente } from 'src/app/models/tipocontribuyente';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseMensaje } from 'src/app/models/responseMensaje';

@Component({
  selector: 'app-crear-tipocontribuyente',
  templateUrl: './crear-tipocontribuyente.component.html',
  styleUrls: ['./crear-tipocontribuyente.component.css']
})
export class CrearTipocontribuyenteComponent implements OnDestroy, OnInit {
  protected readonly unsubscribe$ = new Subject<void>();

  get nombre() { return this.tipocontribuyenteForm.get('nombre'); }

  public tipocontribuyenteForm: FormGroup;

  constructor(
    private TipocontribuyenteService: TipocontribuyenteService,
    private toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.tipocontribuyenteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
    });
  }


  onCreate(): void {
    const tipocontribuyente = new Tipocontribuyente(null, this.nombre.value);
    Swal.fire({
      title: 'Registar',
      text: '¿Desea agregar tipo de contribuyente ' + tipocontribuyente.nombre + '?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.TipocontribuyenteService.create(tipocontribuyente).pipe(takeUntil(this.unsubscribe$))
          .subscribe((res: ResponseMensaje) => {
            this.handleSuccessResponse(res);
          },
            err => {
              this.handleWrongResponse();
            });

      } else if (result.isDenied) {
        Swal.fire('Sin cambios', '', 'info')
      }
    })
  }

  handleSuccessResponse(res: ResponseMensaje) {
    if (res.codigo === 200) {
      Swal.fire(res.mensaje, '', 'success')
      this.router.navigate(['tipocontribuyente/listar']);
    } else {
      this.toastr.error(res.mensaje, 'Fail', {
        timeOut: 3000, positionClass: 'toast-top-right',
      });
    }
  }

  handleWrongResponse() {
    this.toastr.error('Error Inesperado', 'Fail', {
      timeOut: 3000, positionClass: 'toast-top-right',
    });
  }

  volver() {
    this.router.navigate(['tipocontribuyente/listar']);
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
