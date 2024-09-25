import { ChevronLeftIcon, File, ListFilter, MoreHorizontal, Pencil, PlusCircle, Search, Trash } from 'lucide-react'

// import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate } from 'react-router-dom'
import { PrivateRoutes } from '@/models/routes.model'
import { useGetAllProducts } from '../../hooks/useProduct'
import { type Product } from '../../models/product.model'
// import { toast } from 'sonner'
import { useHeader } from '@/hooks'
import Skeleton from '@/components/shared/skeleton'
import Pagination from '@/components/shared/pagination'
// import { useSelector } from 'react-redux'
// import { type RootState } from '@/redux/store'
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/useDebounce'
import { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { useDeleteResource } from '@/hooks/useCrud'
import { ENDPOINTS } from '@/utils'

const ProductosPage = (): JSX.Element => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Productos' }
  ])
  const navigate = useNavigate()
  // const user = useSelector((state: RootState) => state.user)
  const { products, isLoading, countData, filterOptions, newPage, prevPage, setOffset, search, mutate } = useGetAllProducts({ isGetAll: false })
  const [searchProduct, setSearchProduct] = useState('')
  const debounceSearchProduct = useDebounce(searchProduct, 1000)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // const { deleteProduct } = useDeleteProduct()
  const { deleteResource: deleteProduct } = useDeleteResource(ENDPOINTS.PRODUCT)

  const deletePermanentlyProduct = (id: string) => {
    toast.promise(deleteProduct(id), {
      loading: 'Cargando...',
      success: () => {
        setTimeout(() => {
          void mutate()
          navigate(PrivateRoutes.PRODUCT, { replace: true })
        }, 1000)
        return 'Usuario eliminado exitosamente'
      },
      error: 'Ocurrio un error al eliminar el usuario'
    })
    setIsDialogOpen(false)
  }

  useEffect(() => {
    search('name', debounceSearchProduct)
  }, [debounceSearchProduct])

  return (
    <>
      <Tabs defaultValue="all" className='grid gap-2 overflow-hidden w-full relative'>
        <div className="inline-flex items-center flex-wrap gap-2 z-10">
          <Button
            type="button"
            onClick={() => { navigate(-1) }}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Button>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Activos</TabsTrigger>
          </TabsList>
          <form className='ml-auto py-1' onSubmit={(e) => { e.preventDefault() }}>
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar"
                className="w-full appearance-none bg-background pl-8 shadow-none outline-none h-8 ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 ring-offset-0 xl:min-w-80"
                onChange={(e) => { setSearchProduct(e.target.value) }}
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className=''>
              <Button variant="outline" size="sm" className="h-8 gap-1"><ListFilter className="h-3.5 w-3.5" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1"><File className="h-3.5 w-3.5" /></Button>
          <Button onClick={() => { navigate(PrivateRoutes.PRODUCT_ADD) }} size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only xl:not-sr-only sm:whitespace-nowrap">Agregar</span>
          </Button>
        </div>
        <TabsContent value="all" className='relative overflow-hidden'>
          <Card x-chunk="dashboard-06-chunk-0" className='flex flex-col overflow-hidden w-full relative'>
            <CardHeader>
              <CardTitle>Todos los productos</CardTitle>
              <CardDescription>
                Administre sus productos y vea su desempeño de ventas.
              </CardDescription>
            </CardHeader>
            <CardContent className='overflow-hidden relative w-full'>
              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Imagen</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Marca</TableHead>
                      <TableHead>Categoria</TableHead>
                      {/* {/admin/i.test(user.role.name) && <TableHead>Sucursal</TableHead>} */}
                      {/* <TableHead>Estado</TableHead> */}
                      <TableHead><span className='sr-only'>Actions</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading
                      ? <Skeleton rows={filterOptions.limit} columns={8} />
                      : products?.map((product: Product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <img
                              width="42"
                              height="42"
                              alt="Product image"
                              className="aspect-square rounded-md object-cover mx-auto"
                              src={product.imagenUrl ? product.imagenUrl : 'https://media.istockphoto.com/id/1354776457/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=w3OW0wX3LyiFRuDHo9A32Q0IUMtD4yjXEvQlqyYk9O4='}
                            />
                          </TableCell>
                          <TableCell>{product.nombre}</TableCell>
                          <TableCell title={product?.descripcion ?? '-'}>
                            {product?.descripcion
                              ? (product?.descripcion.length > 25 ? product?.descripcion.substring(0, 25) + '...' : product?.descripcion)
                              : '-'
                            }
                          </TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>Bs. {product.precio}</TableCell>
                          <TableCell>{product.marca}</TableCell>
                          <TableCell>{product.categoria?.nombre}</TableCell>
                          {/* {/admin/i.test(user.role.name) && <TableCell>{product.branch?.name}</TableCell>} */}
                          {/* <TableCell>
                            <Badge variant={product.is_active ? 'default' : 'outline'}>
                              {product.is_active ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </TableCell> */}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className='bg-light-bg-primary' align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                {/* <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PRODUCT}/${product.id}/detalles`) }}>Ver detalles</DropdownMenuItem> */}
                                <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PRODUCT}/${product.id}`) }}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <AlertDialogTrigger asChild>
                                      <div
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          width: '100%',
                                          justifyContent: 'space-between'
                                        }}
                                        onClick={(event) => { event.stopPropagation() }}
                                      >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                          <Trash className="mr-2 h-4 w-4" />
                                          Delete
                                        </div>
                                      </div>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className='bg-light-bg-primary'>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Estas seguro de eliminar este descuento?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Esta acción no se puede deshacer. Esto eliminará permanentemente tu
                                          descuento.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => { deletePermanentlyProduct(product.id) }}>Continue</AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className='w-full'>
              <Pagination
                allItems={countData ?? 0}
                currentItems={products?.length ?? 0}
                limit={filterOptions.limit}
                newPage={() => { newPage(countData ?? 0) }}
                offset={filterOptions.offset}
                prevPage={prevPage}
                setOffset={setOffset}
                setLimit={() => { }}
                params={true}
              />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default ProductosPage
