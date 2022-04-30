export class NuevoUsuario {
    nombre: string;
    usuario: string;
    email: string;
    password: string;
    constructor(nombre: string, usuario: string, email: string, password: string) {
        this.nombre = nombre;
        this.usuario = usuario;
        this.email = email;
        this.password = password;
    }
}
