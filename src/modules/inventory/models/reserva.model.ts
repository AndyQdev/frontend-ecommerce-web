import { type ApiBase } from '@/models/api-base'
import { type Product } from './product.model'
import { type Cliente } from '@/modules/users/models/cliente.model'

export interface Reserva extends ApiBase {
  cliente: Cliente
  product: Product
  fechaReserva: string
  estado: string
}
