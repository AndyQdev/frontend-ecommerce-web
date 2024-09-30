import { createElement, lazy } from 'react'
import { PrivateRoutes, type Route } from '@/models/routes.model'
import { type PERMISSION } from '@/modules/auth/utils/permissions.constants'

// const ProfilePage = lazy(() => import('@/modules/users/pages/profile'))
// const ProfileForm = lazy(() => import('@/modules/users/pages/profile/components/profile-form'))
const UserPage = lazy(() => import('@/modules/users/pages/users/index'))
const ClientePage = lazy(() => import('@/modules/users/pages/clientes/index'))
const UserFormPage = lazy(() => import('@/modules/users/pages/users/components/user-form'))
const RolesPage = lazy(() => import('@/modules/auth/pages/roles/index'))
// const RolesFormPage = lazy(() => import('@modules/auth/pages/roles/components/role-form'))
const PermissionsPage = lazy(() => import('@/modules/auth/pages/permissions'))
// const PermissionsFormPage = lazy(() => import('@/modules/auth/pages/permissions/components/permissions-form'))

export const userRoutes: Route[] = [
  // {
  //   path: PrivateRoutes.PROFILE,
  //   element: createElement(ProfilePage),
  //   permissions: [] as PERMISSION[]
  // },
  // {
  //   path: PrivateRoutes.PROFILE_UPDATE,
  //   element: createElement(ProfileForm, { buttonText: 'Actualizar', title: 'Actualizar su Cuenta' }),
  //   permissions: [] as PERMISSION[]
  // },
  {
    path: PrivateRoutes.CLIENTES,
    element: createElement(ClientePage),
    // permissions: [PERMISSION.USER, PERMISSION.USER_SHOW]
    permissions: [] as PERMISSION[]

  },
  {
    path: PrivateRoutes.USER,
    element: createElement(UserPage),
    // permissions: [PERMISSION.USER, PERMISSION.USER_SHOW]
    permissions: [] as PERMISSION[]

  },
  {
    path: PrivateRoutes.USER_CREAR,
    element: createElement(UserFormPage, { buttonText: 'Guardar Usuario', title: 'Crear Usuario' }),
    permissions: [] as PERMISSION[]
    // permissions: [PERMISSION.USER]
  },
  {
    path: PrivateRoutes.USER_EDIT,
    element: createElement(UserFormPage, { buttonText: 'Editar Usuario', title: 'Actualizar Usuario' }),
    permissions: [] as PERMISSION[]
    // permissions: [PERMISSION.USER]
  },
  {
    path: PrivateRoutes.ROLES,
    element: createElement(RolesPage),
    permissions: [] as PERMISSION[]
  },
  // {
  //   path: PrivateRoutes.ROLE_FORM,
  //   element: createElement(RolesFormPage, { title: 'Crear Rol', buttonText: 'Guardar Rol' }),
  //   permissions: [PERMISSION.ROLE]
  // },
  // {
  //   path: PrivateRoutes.ROLE_EDIT,
  //   element: createElement(RolesFormPage, { title: 'Actualizar Rol', buttonText: 'Guardar Rol' }),
  //   permissions: [PERMISSION.ROLE]
  // },
  {
    path: PrivateRoutes.PERMISSIONS,
    element: createElement(PermissionsPage),
    permissions: [] as PERMISSION[]

    // permissions: [PERMISSION.PERMISSION, PERMISSION.PERMISSION_SHOW]
  }
  // {
  //   path: PrivateRoutes.PERMISSIONS_CREATE,
  //   element: createElement(PermissionsFormPage, { title: 'Crear Permiso', buttonText: 'Guardar Permiso' }),
  //   permissions: [PERMISSION.PERMISSION]
  // },
  // {
  //   path: PrivateRoutes.PERMISSIONS_EDIT,
  //   element: createElement(PermissionsFormPage, { title: 'Actualizar Permiso', buttonText: 'Guardar Permiso' }),
  //   permissions: [PERMISSION.PERMISSION]
  // }
]
