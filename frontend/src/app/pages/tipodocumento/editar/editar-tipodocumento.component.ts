import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResponseMensaje } from 'src/app/models/responseMensaje';
import { Tipodocumento } from 'src/app/models/tipodocumento';
import { TipodocumentoService } from 'src/app/service/tipodocumento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tipodocumento',
  templateUrl: './editar-tipodocumento.component.html',
  styleUrls: ['./editar-tipodocumento.component.css']
})
export class EditarTipodocumentoComponent implements OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();
  tipodocumento: Tipodocumento = null;
  id_tipo_documento: number = this.activatedRoute.snapshot.params.id
  opciones = [
    { value: true, text: 'ACTIVO' },
    { value: false, text: 'INACTIVO' },
  ];

  public tipodocumentoForm: FormGroup;
  get codigo() { return this.tipodocumentoForm.get('codigo'); }
  get nombre() { return this.tipodocumentoForm.get('nombre'); }
  get descripcion() { return this.tipodocumentoForm.get('descripcion'); }
  get estado() { return this.tipodocumentoForm.get('estado'); }

  constructor(
    private tipodocumentoService: TipodocumentoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.tipodocumentoForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      estado: ['', [Validators.required]],
    });
    this.tipodocumentoService.getById(this.id_tipo_documento)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tipo: Tipodocumento) => {
        this.tipodocumento = tipo;
      },
        err => {
          this.handleWrongResponse();
        });
  }

  onUpdate(): void {
    Swal.fire({
      title: 'Modificar',
      text: '¿Desea modificar tipo de documento ' + this.tipodocumento.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipodocumentoService.update(this.id_tipo_documento, this.tipodocumento)
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
      this.router.navigate(['tipodocumento/listar']);
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
    this.router.navigate(['tipodocumento/listar']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
