export type Identifiable = {
    id: number
}

export type Descriptible = {
    description: string
}

type TipoUsuario = Identifiable & Descriptible 

export type Usuario = Identifiable &  {    
    name: string,
    surname: string,
    bornDate: string,
    numeroDocumento: string,
    phoneNumber: string,
    type: TipoUsuario
}