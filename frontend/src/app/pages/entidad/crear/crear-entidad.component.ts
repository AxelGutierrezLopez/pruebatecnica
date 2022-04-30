import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EntidadService } from 'src/app/service/entidad.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseMensaje } from 'src/app/models/responseMensaje';
import { Tipodocumento } from 'src/app/models/tipodocumento';
import { Tipocontribuyente } from 'src/app/models/tipocontribuyente';
import { Entidad } from 'src/app/models/entidad.';
import { TipocontribuyenteService } from 'src/app/service/tipocontribuyente.service';
import { TipodocumentoService } from 'src/app/service/tipodocumento.service';

@Component({
  selector: 'app-crear-entidad',
  templateUrl: './crear-entidad.component.html',
  styleUrls: ['./crear-entidad.component.css']
})
export class CrearEntidadComponent implements OnDestroy, OnInit {
  protected readonly unsubscribe$ = new Subject<void>();
  tiposdocumentos: Tipodocumento[] = [];
  tiposcontribuyentes: Tipocontribuyente[] = [];
  get nrodocumento() { return this.entidadForm.get('nrodocumento'); }
  get razonsocial() { return this.entidadForm.get('razonsocial'); }
  get id_tipodocumento() { return this.entidadForm.get('id_tipodocumento'); }
  get id_tipocontribuyente() { return this.entidadForm.get('id_tipocontribuyente'); }
  get nombrecomercial() { return this.entidadForm.get('nombrecomercial'); }
  get direccion() { return this.entidadForm.get('direccion'); }
  get telefono() { return this.entidadForm.get('telefono'); }

  public entidadForm: FormGroup;

  constructor(
    private entidadService: EntidadService,
    private tipocontribuyenteService: TipocontribuyenteService,
    private tipodocumentoService: TipodocumentoService,
    private toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
  ) {

    // CONTRIBUYENTES
    this.tipocontribuyenteService.listActive()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tipos: Tipocontribuyente[]) => {
        this.tiposcontribuyentes = tipos;
      },
        err => {
          this.handleWrongResponse();
        });

    // DOCUMENTOS
    this.tipodocumentoService.listActive()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tipos: Tipodocumento[]) => {
        this.tiposdocumentos = tipos;
      },
        err => {
          this.handleWrongResponse();
        });

  }

  ngOnInit() {
    this.entidadForm = this.fb.group({
      nrodocumento: ['', [Validators.required, Validators.maxLength(100)]],
      razonsocial: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(20)]],
      id_tipodocumento: ['', [Validators.required]],
      id_tipocontribuyente: ['', [Validators.required]],
      nombrecomercial: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(20)]],
      direccion: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(20)]],
      telefono: ['', [Validators.required, Validators.minLength(9)]],
    });
  }


  onCreate(): void {
    const tipodocumento = new Tipodocumento(this.id_tipodocumento.value, null, null, null);
    const tipocontribuyente = new Tipocontribuyente(this.id_tipocontribuyente.value, null);
    const entidad = new Entidad(this.nrodocumento.value, this.razonsocial.value, tipodocumento, tipocontribuyente, this.nombrecomercial.value, this.direccion.value, this.telefono.value);
    Swal.fire({
      title: 'Registar',
      text: '¿Desea agregar entidad ' + entidad.razonsocial + '?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entidadService.create(entidad).pipe(takeUntil(this.unsubscribe$))
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
      this.router.navigate(['entidad/listar']);
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
    this.router.navigate(['entidad/listar']);
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
