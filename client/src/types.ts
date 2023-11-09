export type Identifiable = {
    id: number
}

export type Descriptible = {
    description: string
}

type UserType = Identifiable & Descriptible 

export type User = Identifiable &  {    
    name: string,
    surname: string,
    bornDate: string,
    cuit: string,
    phoneNumber: string,
    type: UserType
}