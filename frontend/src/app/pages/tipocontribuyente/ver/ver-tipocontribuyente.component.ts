import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Tipocontribuyente } from 'src/app/models/tipocontribuyente';
import { TipocontribuyenteService } from 'src/app/service/tipocontribuyente.service';

@Component({
  selector: 'app-ver-tipocontribuyente',
  templateUrl: './ver-tipocontribuyente.component.html',
  styleUrls: ['./ver-tipocontribuyente.component.css']
})
export class VerTipocontribuyenteComponent implements OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();
  tipocontribuyente: Tipocontribuyente = null;
  id_tipo_contribuyente = this.activatedRoute.snapshot.params.id;

  constructor(
    private tipocontribuyenteService: TipocontribuyenteService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tipocontribuyenteService.getById(this.id_tipo_contribuyente)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tipo: Tipocontribuyente) => {
        this.tipocontribuyente = tipo;
      }, err => {
        this.handleWrongResponse();
      });
  }

  handleWrongResponse() {
    this.toastr.error('Error Inesperado', 'Fail', {
      timeOut: 3000, positionClass: 'toast-top-right',
    });
  }

  volver(): void {
    this.router.navigate(['tipocontribuyente/listar']);
  }

  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
