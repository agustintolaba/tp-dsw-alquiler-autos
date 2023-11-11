export interface SQLError {
    code: string,
    errno: number,
    sqlState: string
}

export function isSQLError(error: any): error is SQLError {
    return (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        'errno' in error &&
        'sqlState' in error
    );
}

export function getSQLErrorMessage(error: SQLError, entityName: string, female: boolean = false): string {
    switch (error.errno) {
        case 1062: {
            return `${entityName} ya ${female ? "registrada" : "registrado"}`
        }
        default: {
            return "Error en la base de datos"
        }
    }
}