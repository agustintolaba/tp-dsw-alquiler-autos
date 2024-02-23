export function isSQLError(error) {
    return (error &&
        typeof error === 'object' &&
        'code' in error &&
        'errno' in error &&
        'sqlState' in error);
}
export function getSQLErrorMessage(error, entityName, female = false) {
    switch (error.errno) {
        case 1062: {
            return `${entityName} ya ${female ? "registrada" : "registrado"}`;
        }
        case 1451: {
            return `${entityName} imposible de eliminar por referencia`;
        }
        default: {
            return "Error en la base de datos";
        }
    }
}
//# sourceMappingURL=errorHandling.js.map