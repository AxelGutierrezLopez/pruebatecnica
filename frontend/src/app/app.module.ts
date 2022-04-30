import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { interceptorProvider } from './interceptors/prod-interceptor.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { ListaTipoDocumentoComponent } from './pages/tipodocumento/lista/lista-tipodocumento.component';
import { CrearTipodocumentoComponent } from './pages/tipodocumento/crear/crear-tipodocumento.component';
import { EditarTipodocumentoComponent } from './pages/tipodocumento/editar/editar-tipodocumento.component';
import { VerTipodocumentoComponent } from './pages/tipodocumento/ver/ver-tipodocumento.component';
import { ListaTipocontribuyenteComponent } from './pages/tipocontribuyente/lista/lista-tipocontribuyente.component';
import { CrearTipocontribuyenteComponent } from './pages/tipocontribuyente/crear/crear-tipocontribuyente.component';
import { EditarTipocontribuyenteComponent } from './pages/tipocontribuyente/editar/editar-tipocontribuyente.component';
import { VerTipocontribuyenteComponent } from './pages/tipocontribuyente/ver/ver-tipocontribuyente.component';
import { ListaEntidadComponent } from './pages/entidad/lista/lista-entidad.component';
import { CrearEntidadComponent } from './pages/entidad/crear/crear-entidad.component';
import { EditarEntidadComponent } from './pages/entidad/editar/editar-entidad.component';
import { VerEntidadComponent } from './pages/entidad/ver/ver-entidad.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    IndexComponent,

    ListaTipoDocumentoComponent,
    CrearTipodocumentoComponent,
    EditarTipodocumentoComponent,
    VerTipodocumentoComponent,

    ListaTipocontribuyenteComponent,
    CrearTipocontribuyenteComponent,
    EditarTipocontribuyenteComponent,
    VerTipocontribuyenteComponent,

    ListaEntidadComponent,
    CrearEntidadComponent,
    EditarEntidadComponent,
    VerEntidadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
