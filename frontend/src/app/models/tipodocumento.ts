export class Tipodocumento {
  id_tipo_documento?: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  estado: boolean;

  constructor(id_tipo_documento: number, codigo: string, nombre: string, descripcion: string) {
    this.id_tipo_documento = id_tipo_documento;
    this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}