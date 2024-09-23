import { AppConfig } from '../config'

export const ENDPOINTS = {
  // auth
  AUTH: '/auth',
  RESET_PASSWORD: '/api/reset-password',
  RECOVER_PASSWORD: '/api/forgot-password',
  // user
  USER: '/api/users',
  ROLE: '/api/roles',
  PERMISO: '/api/permiso',

  // administracion
  BRANCH: '/api/branch',

  // inventario
  PRODUCT: '/api/productos',
  CATEGORY: '/api/categorias',

  LOGIN: '/api/login',
  VERIFY: '/api/checkToken',
  LOGOUT: '/api/logout',
  // RECOVER_PASSWORD: '/api/forgot-password',
  // RESET_PASSWORD: '/api/reset-password',
  STORE: '/api/store',
  STORE_COMMENT: '/api/store-comment'
  // CATEGORY: '/api/category'
}

export const API_BASEURL = AppConfig.API_URL
