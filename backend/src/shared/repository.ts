export interface Repository <T>{
  findAll(): T[] | undefined
  findOne(item: {idProvincia: string}): T| undefined
  add(item: T): T| undefined
  update(item: T): T| undefined
  delete(item: {idProvincia: string}): T| undefined
}

export interface RepositoryUsuario <T>{
  findAll(): T[] | undefined
  findOne(item: {idUsuario: string}): T| undefined
  add(item: T): T| undefined
  update(item: T): T| undefined
  delete(item: {idUsuario: string}): T| undefined
}

export interface RepositoryTipoVehiculo <T>{
  findAll(): T[] | undefined
  findOne(item: {idTipoVehiculo: string}): T| undefined
  add(item: T): T| undefined
  update(item: T): T| undefined
  delete(item: {idTipoVehiculo: string}): T| undefined
}