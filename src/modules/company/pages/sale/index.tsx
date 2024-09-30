import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, FileIcon, ListFilterIcon, MoreHorizontal, PlusCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Pagination from '@/components/shared/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Datos estáticos de ventas
const staticSales = [
  {
    id: '1',
    code: 'S001',
    date: '2024-01-01',
    time: '10:30 AM',
    total: 500.0,
    discount: 10.0,
    seller: { name: 'Vendedor 1' },
    branch: { name: 'Sucursal 1' },
    saleDetails: [{ product: 'Producto A' }],
    customer: { name: 'Cliente 1' },
    state: 'Finalized'
  },
  {
    id: '2',
    code: 'S002',
    date: '2024-01-05',
    time: '12:00 PM',
    total: 350.0,
    discount: 0.0,
    seller: { name: 'Vendedor 2' },
    branch: { name: 'Sucursal 2' },
    saleDetails: [{ product: 'Producto B' }],
    customer: { name: 'Cliente 2' },
    state: 'Draft'
  }
]

const SalePage = () => {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('product') // Controla la pestaña seleccionada

  return (
    <Tabs defaultValue={selectedTab} className='grid gap-2 overflow-hidden w-full relative'>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={() => { navigate(-1) }}
          variant="outline"
          size="icon"
          className="h-7 w-7"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          <span className="sr-only">Volver</span>
        </Button>
        <TabsList className='h-7 '>
          <TabsTrigger value="fuel" onClick={() => { setSelectedTab('fuel') }}>Combustible</TabsTrigger>
          <TabsTrigger value="product" onClick={() => { setSelectedTab('product') }}>Producto</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1 text-sm"
              >
                <ListFilterIcon className="h-3.5 w-3.5" />
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
            <FileIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Reporte</span>
          </Button>
          <Button size="sm" className="h-8 gap-1" onClick={() => { navigate('/sales/create') }}>
            <PlusCircleIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Crear venta
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="product" className='relative overflow-hidden'>
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Ventas</CardTitle>
            <CardDescription>
              Listado de todas las ventas de productos.
            </CardDescription>
          </CardHeader>
          <CardContent className='overflow-hidden relative w-full'>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Fecha y hora</TableHead>
                    <TableHead>Sucursal</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Descuento</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead><div className='sr-only'></div></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staticSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.code}</TableCell>
                      <TableCell>{sale.date} {sale.time}</TableCell>
                      <TableCell>{sale.branch?.name}</TableCell>
                      <TableCell>Bs. {sale.total.toFixed(2)}</TableCell>
                      <TableCell>Bs. {sale.discount.toFixed(2)}</TableCell>
                      <TableCell>{sale.seller.name}</TableCell>
                      <TableCell>{sale.saleDetails?.length ?? 0}</TableCell>
                      <TableCell>{sale.customer.name}</TableCell>
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
                            <DropdownMenuItem onClick={() => { navigate(`/sales/${sale.id}/details`) }}>Ver venta</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {staticSales.length === 0 && (
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary pt-4">
                  No hay ventas que mostrar.
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Pagination
              allItems={staticSales.length}
              currentItems={staticSales.length}
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

export default SalePage
