import { type ApiBase } from '@/models/api-base'
import { type Categoria } from './catorgoria.model'

export interface Product extends ApiBase {
  nombre: string
  stock: number
  precio: number
  descripcion: string
  imagenUrl: string
  categoria?: Categoria
  marca: string
}

export interface CreateProduct extends Partial<Product> {
  branchId: string
  categoryId: string
  groupsId?: string[]
}

export interface Category extends ApiBase {
  name: string
  image_url: string
  description: string
}

export interface ProductGroup extends ApiBase {
  group: Group
}

export interface Group extends ApiBase {
  name: string
  description: string
}
