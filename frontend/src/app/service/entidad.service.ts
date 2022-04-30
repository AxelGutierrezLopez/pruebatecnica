import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseMensaje } from '../models/responseMensaje';
import { Entidad } from '../models/entidad.';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  tipoURL = '/api/entidad';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Entidad[]> {
    return this.httpClient.get<Entidad[]>(this.tipoURL);
  }

  public getById(id_entidad: number): Observable<Entidad> {
    return this.httpClient.get<Entidad>(this.tipoURL + `/${id_entidad}`);
  }
  
  public create(entidad: Entidad): Observable<ResponseMensaje> {
    return this.httpClient.post<ResponseMensaje>(this.tipoURL, entidad);
  }

  public update(id_entidad: number, entidad: Entidad): Observable<ResponseMensaje> {
    return this.httpClient.put<ResponseMensaje>(this.tipoURL + `/${id_entidad}`, entidad);
  }

  public disabled(id_entidad: number): Observable<any> {
    return this.httpClient.delete<any>(this.tipoURL + `/${id_entidad}`);
  }
}
