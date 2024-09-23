import { PrivateRoutes } from '@/models/routes.model'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'
import { Building2Icon, BuildingIcon, FileText, KeyIcon, PackageIcon, ShoppingCart, Tag, UserCogIcon, UserIcon, UsersIcon } from 'lucide-react'
import { createElement } from 'react'

export interface MenuHeaderRoute {
  path?: string
  label: string
  icon?: JSX.Element
  children?: MenuHeaderRoute[]
  permissions?: PERMISSION[]
}

export const MenuSideBar: MenuHeaderRoute[] = [
  {
    label: 'Gestión de Usuarios',
    icon: createElement(UserCogIcon, { width: 20, height: 20 }),
    path: '/usuarios',
    permissions: [PERMISSION.USER, PERMISSION.USER_SHOW, PERMISSION.ROLE, PERMISSION.ROLE_SHOW, PERMISSION.PERMISSION, PERMISSION.PERMISSION_SHOW],
    children: [
      {
        path: '/usuarios',
        label: 'Usuarios',
        icon: createElement(UsersIcon, { width: 20, height: 20 }),
        permissions: [PERMISSION.USER, PERMISSION.USER_SHOW]
      },
      {
        path: '/usuarios/roles',
        label: 'Roles',
        icon: createElement(UserIcon, { width: 20, height: 20 }),
        permissions: [PERMISSION.ROLE, PERMISSION.ROLE_SHOW]
      },
      {
        path: '/usuarios/permisos',
        label: 'Permisos',
        icon: createElement(KeyIcon, { width: 20, height: 20 }),
        permissions: [PERMISSION.PERMISSION, PERMISSION.PERMISSION_SHOW]
      }
    ]
  },
  {
    label: 'Inventario',
    icon: createElement(PackageIcon, { width: 20, height: 20 }),
    path: '/productos',
    permissions: [PERMISSION.PRODUCT, PERMISSION.PRODUCT_SHOW, PERMISSION.CATEGORY, PERMISSION.CATEGORY_SHOW],
    children: [
      {
        path: PrivateRoutes.PRODUCT,
        label: 'Productos',
        icon: createElement(PackageIcon, { width: 20, height: 20 }),
        permissions: [PERMISSION.PRODUCT, PERMISSION.PRODUCT_SHOW]
      },
      {
        path: PrivateRoutes.CATEGORY,
        label: 'Categorías',
        icon: createElement(Tag, { width: 20, height: 20 }),
        permissions: [PERMISSION.CATEGORY, PERMISSION.CATEGORY_SHOW]
      }
    ]
  },
  {
    label: 'Pedidos y Órdenes',
    icon: createElement(ShoppingCart, { width: 20, height: 20 }),
    path: '/pedidos',
    permissions: [PERMISSION.PURCHASE_ORDER, PERMISSION.PURCHASE_ORDER_SHOW],
    children: [
      {
        path: PrivateRoutes.PURCHASE_ORDER,
        label: 'Ordenes',
        icon: createElement(ShoppingCart, { width: 20, height: 20 }),
        permissions: [PERMISSION.PURCHASE_ORDER, PERMISSION.PURCHASE_ORDER_SHOW]
      }
    ]
  },
  {
    label: 'Administracion',
    icon: createElement(Building2Icon, { width: 20, height: 20 }),
    path: '/sucursales',
    permissions: [PERMISSION.BRANCH, PERMISSION.BRANCH_SHOW],
    children: [
      {
        path: PrivateRoutes.BRANCH,
        label: 'Sucursales',
        icon: createElement(BuildingIcon, { width: 20, height: 20 }),
        permissions: [PERMISSION.BRANCH, PERMISSION.BRANCH_SHOW]
      }
    ]
  },
  {
    label: 'Reportes y Análisis',
    icon: createElement(FileText, { width: 20, height: 20 }),
    path: '/reportes',
    permissions: [PERMISSION.REPORTS, PERMISSION.REPORT_SHOW],
    children: [
      {
        path: PrivateRoutes.SALES_REPORT,
        label: 'Reportes de Ventas',
        icon: createElement(FileText, { width: 20, height: 20 }),
        permissions: [PERMISSION.REPORTS, PERMISSION.REPORT_SHOW]
      }
    ]
  }
]
