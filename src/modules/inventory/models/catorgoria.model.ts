import { type ApiBase } from '@/models/api-base'

export interface Categoria extends ApiBase {
  nombre: string
  descripcion: string
}
export interface CreateCategoria {
  nombre: string
  descripcion: string
}
