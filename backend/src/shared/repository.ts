export interface Repository <T>{
  findAll(): T[] | undefined
  findOne(item: {idProvincia: string}): T| undefined
  add(item: T): T| undefined
  update(item: T): T| undefined
  delete(item: {idProvincia: string}): T| undefined
}