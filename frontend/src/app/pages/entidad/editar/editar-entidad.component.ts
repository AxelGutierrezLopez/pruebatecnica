import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Entidad } from 'src/app/models/entidad.';
import { ResponseMensaje } from 'src/app/models/responseMensaje';
import { Tipocontribuyente } from 'src/app/models/tipocontribuyente';
import { Tipodocumento } from 'src/app/models/tipodocumento';
import { EntidadService } from 'src/app/service/entidad.service';
import { TipocontribuyenteService } from 'src/app/service/tipocontribuyente.service';
import { TipodocumentoService } from 'src/app/service/tipodocumento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-entidad',
  templateUrl: './editar-entidad.component.html',
  styleUrls: ['./editar-entidad.component.css']
})
export class EditarEntidadComponent implements OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();
  entidad: Entidad = null;
  tiposdocumentos: Tipodocumento[] = [];
  tiposcontribuyentes: Tipocontribuyente[] = [];
  id_entidad: number = this.activatedRoute.snapshot.params.id
  opciones = [
    { value: true, text: 'ACTIVO' },
    { value: false, text: 'INACTIVO' },
  ];

  public entidadForm: FormGroup;
  get nrodocumento() { return this.entidadForm.get('nrodocumento'); }
  get razonsocial() { return this.entidadForm.get('razonsocial'); }
  get id_tipodocumento() { return this.entidadForm.get('id_tipodocumento'); }
  get id_tipocontribuyente() { return this.entidadForm.get('id_tipocontribuyente'); }
  get nombrecomercial() { return this.entidadForm.get('nombrecomercial'); }
  get direccion() { return this.entidadForm.get('direccion'); }
  get telefono() { return this.entidadForm.get('telefono'); }
  get estado() { return this.entidadForm.get('estado'); }

  constructor(
    private entidadService: EntidadService,
    private tipocontribuyenteService: TipocontribuyenteService,
    private tipodocumentoService: TipodocumentoService,
    private activatedRoute: ActivatedRoute,
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
      estado: ['', [Validators.required]]
    });
    this.entidadService.getById(this.id_entidad)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((entidad: Entidad) => {
        this.entidad = entidad;
      },
        err => {
          this.handleWrongResponse();
        });
  }

  onUpdate(): void {
    Swal.fire({
      title: 'Modificar',
      text: '¿Desea modificar entidad ' + this.entidad.razonsocial + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entidadService.update(this.id_entidad, this.entidad)
          .pipe(takeUntil(this.unsubscribe$))
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
