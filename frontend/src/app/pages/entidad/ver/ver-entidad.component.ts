import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Entidad } from 'src/app/models/entidad.';
import { EntidadService } from 'src/app/service/entidad.service';

@Component({
  selector: 'app-ver-entidad',
  templateUrl: './ver-entidad.component.html',
  styleUrls: ['./ver-entidad.component.css']
})
export class VerEntidadComponent implements OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();
  entidad: Entidad = null;
  id_entidad = this.activatedRoute.snapshot.params.id;

  constructor(
    private entidadService: EntidadService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.entidadService.getById(this.id_entidad)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: Entidad) => {
        console.log(res)
        this.entidad = res;
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
    this.router.navigate(['entidad/listar']);
  }

  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
