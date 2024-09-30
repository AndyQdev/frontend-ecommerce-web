import { useNavigate } from 'react-router-dom'
import { File, ListFilterIcon, MoreHorizontal, PlusCircleIcon } from 'lucide-react'

import { PrivateRoutes } from '@/models/routes.model'
import { useHeader } from '@/hooks'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import Pagination from '@/components/shared/pagination'

// Datos estáticos de órdenes de compra
const staticPurchaseOrders = [
  {
    id: '1',
    code: '001',
    date: '2024-01-01',
    time: '10:30 AM',
    total: 200.0,
    provider: { name: 'Calle 2' },
    branch: { name: 'Sucursal A' },
    state: 'En proceso',
    user: { id: 'user123' },
    reason: 'Compra mensual de suministros'
  },
  {
    id: '2',
    code: '002',
    date: '2024-01-05',
    time: '12:00 PM',
    total: 150.0,
    provider: { name: 'Av Bolivar' },
    branch: { name: 'Sucursal B' },
    state: 'Cancelado',
    user: { id: 'user456' },
    reason: 'Pedido especial de productos'
  }
]

const PurchaseOrderPage = () => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Compras', path: PrivateRoutes.COMPANY },
    { label: 'Ordenes de compra' }
  ])

  const navigate = useNavigate()

  return (
    <Tabs defaultValue="week" className='grid gap-2 overflow-hidden w-full relative'>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
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
          <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Exportar</span>
          </Button>
          <Button size="sm" className="h-8 gap-1" onClick={() => { navigate(PrivateRoutes.PURCHASE_ORDER_CREATE) }}>
            <PlusCircleIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar Orden
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="week" className='relative overflow-hidden'>
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Ordenes de Compra</CardTitle>
            <CardDescription>
              Listado de todas las ordenes de compra.
            </CardDescription>
          </CardHeader>
          <CardContent className='overflow-hidden relative w-full '>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Fecha y hora</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Sucursal</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead><div className='sr-only'></div></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staticPurchaseOrders.map((purchaseOrder) => (
                    <TableRow key={purchaseOrder.id}>
                      <TableCell>OC-{purchaseOrder.code}</TableCell>
                      <TableCell>{purchaseOrder.date} {purchaseOrder.time}</TableCell>
                      <TableCell>Bs. {purchaseOrder.total.toFixed(2)}</TableCell>
                      <TableCell>{purchaseOrder.provider.name}</TableCell>
                      <TableCell>{purchaseOrder.branch.name}</TableCell>
                      <TableCell>
                        <Badge variant={
                          purchaseOrder.state === 'En proceso'
                            ? 'default'
                            : purchaseOrder.state === 'Cancelado' ? 'destructive' : 'secondary'
                        }>
                          {purchaseOrder.state}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PURCHASE_ORDER}/${purchaseOrder.id}/detalles`) }}>Ver detalle</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PURCHASE_ORDER}/${purchaseOrder.id}`) }}>Editar</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <Pagination
              allItems={staticPurchaseOrders.length}
              currentItems={staticPurchaseOrders.length}
              limit={5}
              newPage={() => { console.log('Nueva página') }}
              offset={0}
              prevPage={() => { console.log('Página anterior') }}
              setOffset={() => {}}
              setLimit={() => {}}
              params={true}
            />
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default PurchaseOrderPage
