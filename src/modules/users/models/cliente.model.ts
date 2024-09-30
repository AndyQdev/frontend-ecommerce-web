import { type ApiBase } from '@/models/api-base'

export interface Cliente extends ApiBase {
  nombre: string
  email: string
  direccion: string
  telefono: string
  isActive: boolean
  password: string
}
