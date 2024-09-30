import { createElement, lazy } from 'react'
import { PrivateRoutes, type Route } from '@/models/routes.model'
import { type PERMISSION } from '@/modules/auth/utils/permissions.constants'
const ProductPage = lazy(() => import('@/modules/inventory/pages/product'))
const CategoriaPage = lazy(() => import('@/modules/inventory/pages/category/index'))

const ProductFormPage = lazy(() => import('@/modules/inventory/pages/product/components/product-form'))

// const ProductDetailsPage = lazy(() => import('@/modules/inventory/pages/product/details'))
const ReservasPage = lazy(() => import('@/modules/inventory/pages/Reservas/index'))
// const FuelPage = lazy(() => import('@modules/inventory/pages/fuel'))
// const FuelForm = lazy(() => import('@modules/inventory/pages/fuel/components/fuel-form'))
// const GroupPage = lazy(() => import('@/modules/inventory/pages/group'))
// const OuputProductsPage = lazy(() => import('@/modules/inventory/pages/output-product'))
// const OuputDetailsPage = lazy(() => import('@/modules/inventory/pages/output-product/components/output-detail'))

export const inventoryRoutes: Route[] = [
  {
    path: PrivateRoutes.PRODUCT,
    element: createElement(ProductPage),
    permissions: [] as PERMISSION[]
  },
  {
    path: PrivateRoutes.CATEGORY,
    element: createElement(CategoriaPage),
    permissions: [] as PERMISSION[]
  },
  {
    path: PrivateRoutes.PRODUCT_ADD,
    element: createElement(ProductFormPage, { buttonText: 'Guardar Producto', title: 'Crear Producto' }),
    permissions: [] as PERMISSION[]
    // permissions: [PERMISSION.PRODUCT]
  },
  {
    path: PrivateRoutes.PRODCUT_EDIT,
    element: createElement(ProductFormPage, { buttonText: 'Actualizar Producto', title: 'Editar Producto' }),
    permissions: [] as PERMISSION[]
    // permissions: [PERMISSION.PRODUCT]
  },
  {
    path: PrivateRoutes.RESERVAS,
    element: createElement(ReservasPage),
    permissions: [] as PERMISSION[]
    // permissions: [PERMISSION.PRODUCT, PERMISSION.PRODUCT_SHOW]
  }
  // {
  //   path: PrivateRoutes.BATCH_CREATE,
  //   element: createElement(BatchFormPage, { buttonText: 'Guardar Lote', title: 'Crear Lote' }),
  //   permissions: [PERMISSION.PRODUCT]
  // },
  // {
  //   path: PrivateRoutes.FUEL,
  //   element: createElement(FuelPage),
  //   permissions: [PERMISSION.FUEL, PERMISSION.FUEL_SHOW]
  // },
  // {
  //   path: PrivateRoutes.FUEL_ADD,
  //   element: createElement(FuelForm, { buttonText: 'Guardar Combustible', title: 'Crear Combustible' }),
  //   permissions: [PERMISSION.FUEL]
  // },
  // {
  //   path: PrivateRoutes.FUEL_EDIT,
  //   element: createElement(FuelForm, { buttonText: 'Actualizar Combustible', title: 'Editar Combustible' }),
  //   permissions: [PERMISSION.FUEL]
  // },
  // {
  //   path: PrivateRoutes.GROUP,
  //   element: createElement(GroupPage),
  //   permissions: [PERMISSION.GROUP, PERMISSION.GROUP_SHOW]
  // },
  // {
  //   path: PrivateRoutes.OUPUT_PRODUCT,
  //   element: createElement(OuputProductsPage),
  //   permissions: [PERMISSION.PRODUCT_OUTPUT, PERMISSION.PRODUCT_OUTPUT_SHOW]
  // },
  // {
  //   path: PrivateRoutes.OUPUT_DETAIL,
  //   element: createElement(OuputDetailsPage),
  //   permissions: [PERMISSION.PRODUCT_OUTPUT, PERMISSION.PRODUCT_OUTPUT_SHOW]
  // }
]
