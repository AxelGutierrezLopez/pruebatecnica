import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResponseMensaje } from 'src/app/models/responseMensaje';
import { Tipocontribuyente } from 'src/app/models/tipocontribuyente';
import { TipocontribuyenteService } from 'src/app/service/tipocontribuyente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tipocontribuyente',
  templateUrl: './editar-tipocontribuyente.component.html',
  styleUrls: ['./editar-tipocontribuyente.component.css']
})
export class EditarTipocontribuyenteComponent implements OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();
  tipocontribuyente: Tipocontribuyente = null;
  id_tipo_contribuyente: number = this.activatedRoute.snapshot.params.id
  opciones = [
    { value: true, text: 'ACTIVO' },
    { value: false, text: 'INACTIVO' },
  ];

  public tipocontribuyenteForm: FormGroup;
  get nombre() { return this.tipocontribuyenteForm.get('nombre'); }
  get estado() { return this.tipocontribuyenteForm.get('estado'); }

  constructor(
    private tipocontribuyenteService: TipocontribuyenteService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.tipocontribuyenteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      estado: ['', [Validators.required]],
    });
    this.tipocontribuyenteService.getById(this.id_tipo_contribuyente)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tipo: Tipocontribuyente) => {
        this.tipocontribuyente = tipo;
      },
        err => {
          this.handleWrongResponse();
        });
  }

  onUpdate(): void {
    Swal.fire({
      title: 'Modificar',
      text: '¿Desea modificar tipo de contribuyente ' + this.tipocontribuyente.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipocontribuyenteService.update(this.id_tipo_contribuyente, this.tipocontribuyente)
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
