import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TipodocumentoService } from 'src/app/service/tipodocumento.service';
import { Tipodocumento } from 'src/app/models/tipodocumento';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseMensaje } from 'src/app/models/responseMensaje';

@Component({
  selector: 'app-crear-tipodocumento',
  templateUrl: './crear-tipodocumento.component.html',
  styleUrls: ['./crear-tipodocumento.component.css']
})
export class CrearTipodocumentoComponent implements OnDestroy, OnInit {
  protected readonly unsubscribe$ = new Subject<void>();

  get codigo() { return this.tipodocumentoForm.get('codigo'); }
  get nombre() { return this.tipodocumentoForm.get('nombre'); }
  get descripcion() { return this.tipodocumentoForm.get('descripcion'); }

  public tipodocumentoForm: FormGroup;

  constructor(
    private TipodocumentoService: TipodocumentoService,
    private toastr: ToastrService,
    private router: Router,
    public fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.tipodocumentoForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],

    });
  }


  onCreate(): void {
    const tipodocumento = new Tipodocumento(null,this.codigo.value, this.nombre.value, this.descripcion.value);
    Swal.fire({
      title: 'Registar',
      text: '¿Desea agregar tipo de documento ' + tipodocumento.nombre + '?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.TipodocumentoService.create(tipodocumento).pipe(takeUntil(this.unsubscribe$))
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
