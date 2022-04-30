export class Tipocontribuyente {
  id_tipo_contribuyente?: number;
  nombre: string;
  estado: boolean;

  constructor(id_tipo_contribuyente: number, nombre: string) {
      this.nombre = nombre;
      this.id_tipo_contribuyente = id_tipo_contribuyente;
  }
}