import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tipodocumento } from '../models/tipodocumento';
import { ResponseMensaje } from '../models/responseMensaje';

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {

  tipoURL = '/api/tipodocumento';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Tipodocumento[]> {
    return this.httpClient.get<Tipodocumento[]>(this.tipoURL);
  }

  public listActive(): Observable<Tipodocumento[]> {
    return this.httpClient.get<Tipodocumento[]>(this.tipoURL + `/active`);
  }

  public getById(id_tipo_documento: number): Observable<Tipodocumento> {
    return this.httpClient.get<Tipodocumento>(this.tipoURL + `/${id_tipo_documento}`);
  }
  
  public create(tipodocumento: Tipodocumento): Observable<ResponseMensaje> {
    return this.httpClient.post<ResponseMensaje>(this.tipoURL, tipodocumento);
  }

  public update(id_tipo_documento: number, tipodocumento: Tipodocumento): Observable<ResponseMensaje> {
    return this.httpClient.put<ResponseMensaje>(this.tipoURL + `/${id_tipo_documento}`, tipodocumento);
  }

  public disabled(id_tipo_documento: number): Observable<any> {
    return this.httpClient.delete<any>(this.tipoURL + `/${id_tipo_documento}`);
  }
}
