// import { toast } from 'sonner'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, File, ListFilter, MoreHorizontal, Search, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PrivateRoutes } from '@/models/routes.model'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// import Skeleton from '@/components/shared/skeleton'
// import Pagination from '@/components/shared/pagination'
// import { useGetAllUser } from '../../hooks/useUser'
import { Badge } from '@/components/ui/badge'
import { useHeader } from '@/hooks'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
// import useDebounce from '@/hooks/useDebounce'
// import { type Branch } from '@/modules/company/models/branch.model'
// import { GENDER } from '@/utils'
// import { type Role } from '@/modules/auth/models/role.model'
import Pagination from '@/components/shared/pagination'
import Skeleton from '@/components/shared/skeleton'
import { useDeleteResource, useGetAllResource } from '@/hooks/useCrud'
import { ENDPOINTS } from '@/utils'
import { toast } from 'sonner'
import { type Cliente } from '../../models/cliente.model'
// import { PERMISSION } from '@/modules/auth/utils/permissions.constants'

const UserPage = (): JSX.Element => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Usuarios', path: PrivateRoutes.USER },
    { label: 'Clientes' }
  ])
  const navigate = useNavigate()
  const { allResource: allUsers, countData, isLoading, mutate, filterOptions, newPage, prevPage, setOffset } = useGetAllResource(ENDPOINTS.CLIENTES)
  const { deleteResource: deleteUser } = useDeleteResource(ENDPOINTS.USER)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [, setSearchProduct] = useState('')
  console.log(allUsers)
  const deletePermanentlyUser = (id: string) => {
    toast.promise(deleteUser(id), {
      loading: 'Cargando...',
      success: () => {
        setTimeout(() => {
          void mutate()
          navigate(PrivateRoutes.USER, { replace: true })
        }, 1000)
        return 'Usuario eliminado exitosamente'
      },
      error: 'Ocurrio un error al eliminar el usuario'
    })
    setIsDialogOpen(false)
  }

  // useEffect(() => {
  //   search('name', debounceSearchProduct)
  // }, [debounceSearchProduct])
  return (
    <section className='grid gap-4 overflow-hidden w-full relative'>
      <div className="inline-flex items-center flex-wrap gap-2">
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
        <form className='py-1' onSubmit={(e) => { e.preventDefault() }}>
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
          <DropdownMenuTrigger asChild className='ml-auto'>
            <Button variant="outline" size="sm" className="h-8 gap-1"><ListFilter className="h-3.5 w-3.5" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" variant="outline" className="h-8 gap-1"><File className="h-3.5 w-3.5" /></Button>
        {/* <Button onClick={() => { navigate(PrivateRoutes.USER_CREAR) }} size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only lg:not-sr-only sm:whitespace-nowrap">Agregar</span>
        </Button> */}
      </div>
      <Card x-chunk="dashboard-06-chunk-0" className='flex flex-col overflow-hidden w-full relative'>
        <CardHeader>
          <CardTitle>Todos los Usuarios</CardTitle>
        </CardHeader>
        <CardContent className='overflow-hidden relative w-full'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefono</TableHead>
                  <TableHead>Direccion</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead><span className='sr-only'>Opciones</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? <Skeleton rows={filterOptions.limit} columns={8} />
                  : allUsers?.map((user: Cliente) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.nombre}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.telefono}</TableCell>
                        <TableCell>{user.direccion}</TableCell>
                        <TableCell>
                          <Badge variant={!user.isActive ? 'default' : 'outline'}>
                            {!user.isActive ? 'Activo' : 'Inactivo'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu onOpenChange={() => { setIsDialogOpen(false) }}>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className='bg-light-bg-primary'>
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              {/* <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.USER}/${user.id}`) }}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem> */}
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
                                      <AlertDialogAction onClick={() => { deletePermanentlyUser(user.id) }}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                  ))
              }
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className='w-full'>
          <Pagination
            allItems={countData ?? 0}
            currentItems={allUsers?.length ?? 0}
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
    </section>
  )
}

export default UserPage
