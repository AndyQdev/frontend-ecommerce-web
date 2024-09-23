import { PrivateRoutes } from '@/models/routes.model'
import { File, ListFilterIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useGetAllCategorias } from '../../hooks/useCategoria'
import { useHeader } from '@/hooks'
import Loading from '@/components/shared/loading'
import { FormatDateMMMDYYYY } from '@/utils'
import { type Categoria } from '../../models/catorgoria.model'

const PermissionsPage = () => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Inventarios', path: PrivateRoutes.CATEGORY },
    { label: 'Categorias' }
  ])
  const { categorias, isLoading } = useGetAllCategorias()
  return (
    <section className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2">
        <Tabs defaultValue="week" className='grid gap-4'>
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilterIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filtrar</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Todos
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-sm"
              >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Exportar</span>
              </Button>
            </div>
          </div>
          <TabsContent value="week">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-6">
                <CardTitle>Categorias</CardTitle>
                <CardDescription>
                  Listado de las categorias disponibles
                </CardDescription>
              </CardHeader>
              <CardContent className=''>
                <Table >
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead className='hidden sm:table-cell'>Descripción</TableHead>
                      <TableHead className='hidden lg:table-cell'>Fecha de creación</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categorias?.length === 0 && <div>No hay permisos</div>}
                    {categorias?.map((category: Categoria) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.nombre}</TableCell>
                        <TableCell className='hidden sm:table-cell'>{category?.descripcion}</TableCell>
                        <TableCell className='hidden lg:table-cell'>{FormatDateMMMDYYYY(Date())}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {isLoading && <div className='grid place-content-center place-items-center w-full shrink-0 pt-6'><Loading /></div>}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default PermissionsPage
