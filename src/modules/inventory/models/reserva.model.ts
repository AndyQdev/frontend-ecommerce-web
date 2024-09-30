import { type ApiBase } from '@/models/api-base'
import { type User } from '@/modules/users/models/user.model'
import { type Product } from './product.model'

export interface Reserva extends ApiBase {
  user: User
  product: Product
  fechaReserva: string
  estado: string
}
