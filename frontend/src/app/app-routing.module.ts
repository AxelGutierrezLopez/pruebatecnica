import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { ProdGuardService as guard } from './guards/prod-guard.service';
import { ListaTipoDocumentoComponent } from './pages/tipodocumento/lista/lista-tipodocumento.component';
import { CrearTipodocumentoComponent } from './pages/tipodocumento/crear/crear-tipodocumento.component';
import { EditarTipodocumentoComponent } from './pages/tipodocumento/editar/editar-tipodocumento.component';
import { VerTipodocumentoComponent } from './pages/tipodocumento/ver/ver-tipodocumento.component';
import { CrearTipocontribuyenteComponent } from './pages/tipocontribuyente/crear/crear-tipocontribuyente.component';
import { ListaTipocontribuyenteComponent } from './pages/tipocontribuyente/lista/lista-tipocontribuyente.component';
import { EditarTipocontribuyenteComponent } from './pages/tipocontribuyente/editar/editar-tipocontribuyente.component';
import { VerTipocontribuyenteComponent } from './pages/tipocontribuyente/ver/ver-tipocontribuyente.component';
import { CrearEntidadComponent } from './pages/entidad/crear/crear-entidad.component';
import { ListaEntidadComponent } from './pages/entidad/lista/lista-entidad.component';
import { EditarEntidadComponent } from './pages/entidad/editar/editar-entidad.component';
import { VerEntidadComponent } from './pages/entidad/ver/ver-entidad.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  
  { path: 'tipodocumento/crear', component: CrearTipodocumentoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'tipodocumento/listar', component: ListaTipoDocumentoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'tipodocumento/editar/:id', component: EditarTipodocumentoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'tipodocumento/ver/:id', component: VerTipodocumentoComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  
  { path: 'tipocontribuyente/crear', component: CrearTipocontribuyenteComponent, canActivate: [guard], data: { expectedRol: [ 'user'] } },
  { path: 'tipocontribuyente/listar', component: ListaTipocontribuyenteComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'tipocontribuyente/editar/:id', component: EditarTipocontribuyenteComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'tipocontribuyente/ver/:id', component: VerTipocontribuyenteComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },

  { path: 'entidad/crear', component: CrearEntidadComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'entidad/listar', component: ListaEntidadComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'entidad/editar/:id', component: EditarEntidadComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'entidad/ver/:id', component: VerEntidadComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
