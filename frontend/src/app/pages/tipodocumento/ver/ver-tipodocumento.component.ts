import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Tipodocumento } from 'src/app/models/tipodocumento';
import { TipodocumentoService } from 'src/app/service/tipodocumento.service';

@Component({
  selector: 'app-ver-tipodocumento',
  templateUrl: './ver-tipodocumento.component.html',
  styleUrls: ['./ver-tipodocumento.component.css']
})
export class VerTipodocumentoComponent implements OnDestroy {
  protected readonly unsubscribe$ = new Subject<void>();
  tipodocumento: Tipodocumento = null;
  id_tipo_documento = this.activatedRoute.snapshot.params.id;

  constructor(
    private tipodocumentoService: TipodocumentoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tipodocumentoService.getById(this.id_tipo_documento)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tipo: Tipodocumento) => {
        this.tipodocumento = tipo;
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
    this.router.navigate(['tipodocumento/listar']);
  }

  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
