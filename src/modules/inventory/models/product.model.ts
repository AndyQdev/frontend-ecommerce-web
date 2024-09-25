import { type ApiBase } from '@/models/api-base'
import { type Categoria } from './catorgoria.model'
import { type Branch } from '@/modules/company/models/branch.model'

export interface Product extends ApiBase {
  nombre: string
  stock: number
  precio: number
  descripcion: string
  imagenUrl: string
  categoria?: Categoria
  marca: string
  branch?: Branch
}

export interface CreateProduct extends Partial<Omit<Product, 'branch' | 'categoria'>> {
  branch_id: string
  categoria_id: string
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
