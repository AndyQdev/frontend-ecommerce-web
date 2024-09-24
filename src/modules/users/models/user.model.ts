import { type ApiBase } from '@/models/api-base'
import { type Role } from '@/modules/auth/models/role.model'
import { type Branch } from '@/modules/company/models/branch.model'
import { type GENDER } from '@/utils'

export interface User extends ApiBase {
  nombre: string
  username: string
  direccion: string
  telefono: string
  gender: GENDER
  is_active: boolean
  role: Role
  branch: Branch
  password: string
}

export interface CreateUser extends Partial<Omit<User, 'role' | 'branch' | 'gender'>> {
  roleId?: string
  branchId?: string
}

export interface UpdateUser extends CreateUser { }
