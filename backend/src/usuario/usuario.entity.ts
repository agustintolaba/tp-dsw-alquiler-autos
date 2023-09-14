export class Usuario {
  constructor(
    public idUsuario: string, 
    public nombreUsuario: string,
    public apellidoUsuario: string,
    public fechaNacimientoUsuario: string,
    public cuitCliente: string,
    public razonSocialCliente: string,
    public telefonoCliente: string,
    public idEmpleado: string,
    public fechaContratacion: string, 
    public idTipoUsuario: string
    ) {}
}