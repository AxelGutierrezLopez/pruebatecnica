import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tipocontribuyente } from '../models/tipocontribuyente';
import { ResponseMensaje } from '../models/responseMensaje';

@Injectable({
  providedIn: 'root'
})
export class TipocontribuyenteService {

  tipoURL = '/api/tipocontribuyente';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Tipocontribuyente[]> {
    return this.httpClient.get<Tipocontribuyente[]>(this.tipoURL);
  }

  public listActive(): Observable<Tipocontribuyente[]> {
    return this.httpClient.get<Tipocontribuyente[]>(this.tipoURL + `/active`);
  }

  public getById(id_tipo_contribuyente: number): Observable<Tipocontribuyente> {
    return this.httpClient.get<Tipocontribuyente>(this.tipoURL + `/${id_tipo_contribuyente}`);
  }

  public create(tipocontribuyente: Tipocontribuyente): Observable<ResponseMensaje> {
    return this.httpClient.post<ResponseMensaje>(this.tipoURL, tipocontribuyente);
  }

  public update(id_tipo_contribuyente: number, tipocontribuyente: Tipocontribuyente): Observable<ResponseMensaje> {
    return this.httpClient.put<ResponseMensaje>(this.tipoURL + `/${id_tipo_contribuyente}`, tipocontribuyente);
  }

  public disabled(id_tipo_contribuyente: number): Observable<any> {
    return this.httpClient.delete<any>(this.tipoURL + `/${id_tipo_contribuyente}`);
  }
}
