import { Tipocontribuyente } from "./tipocontribuyente";
import { Tipodocumento } from "./tipodocumento";

export class Entidad {
  id_entidad?: number;
  nrodocumento: string;
  razonsocial: string;
  tipodocumento: Tipodocumento;
  tipocontribuyente: Tipocontribuyente;
  nombrecomercial: string;
  direccion: string;
  telefono: string;
  estado: boolean;

  constructor(nrodocumento: string, razonsocial: string, tipodocumento: Tipodocumento,
    tipocontribuyente: Tipocontribuyente, nombrecomercial: string, direccion: string, telefono: string) {
    this.nrodocumento = nrodocumento;
    this.razonsocial = razonsocial;
    this.tipodocumento = tipodocumento;
    this.tipocontribuyente = tipocontribuyente;
    this.nombrecomercial = nombrecomercial;
    this.direccion = direccion;
    this.telefono = telefono;
  }


}