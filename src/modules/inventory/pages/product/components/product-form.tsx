import { CheckCheckIcon, ChevronLeftIcon, ChevronsUpDownIcon, PlusCircleIcon } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useHeader } from '@/hooks'

import { PrivateRoutes } from '@/models/routes.model'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { type Branch } from '@/modules/company/models/branch.model'
import { type CreateProduct, type Product } from '@/modules/inventory/models/product.model'
import { ENDPOINTS } from '@/utils'
import { useCreateResource, useGetAllResource, useGetResource, useUpdateResource } from '@/hooks/useCrud'
import { type Categoria } from '@/modules/inventory/models/catorgoria.model'
import CategoriesForm from '../../category/categories-form'
import { type IFormProps } from '@/models/form-page.model'

const formSchema = z.object({
  marca: z
    .string({ required_error: 'la marca es requerido' })
    .min(3, 'La marca debe tener al menos 3 caracteres')
    .max(50, 'La marca debe tener máximo 50 caracteres'),
  nombre: z
    .string({ required_error: 'El nombre es requerido' })
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(200, 'El nombre debe tener máximo 200 caracteres'),
  stock: z.number({ required_error: 'El stock mínimo es requerido' })
    .positive('El stock mínimo debe ser positivo o mayor a 0'),
  branch_id: z.string({ required_error: 'La sucursal es requerida' }).min(1, 'La sucursal es requerida'),
  categoria_id: z.string({ required_error: 'La categoria es requerida' }).min(1, 'La categoría es requerida'),
  precio: z.number({ required_error: 'El stock mínimo es requerido' })
    .positive('El precio de venta debe ser mayor a 0'),
  // optional
  imagenUrl: z.string().optional(),
  descripcion: z
    .string()
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(500, 'La descripción debe tener máximo 500 caracteres')
    .optional()
})

function ProductFormPage({ buttonText, title }: IFormProps) {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Productos', path: PrivateRoutes.PRODUCT },
    { label: title }
  ])

  const navigate = useNavigate()
  const { id } = useParams()
  const [openModal, setOpenModal] = useState(false)

  const { updateResource: updateProduct } = useUpdateResource<CreateProduct>(ENDPOINTS.PRODUCT, id)
  const { createResource: createProduct } = useCreateResource<CreateProduct>(ENDPOINTS.PRODUCT)

  // const { createProduct, updateProduct, error, isCreating, isUpdating } = useUpdateResource<CreateProduct>(ENDPOINTS.PRODUCT)
  // const { product } = useGetProduct(id)
  const { resource: product } = useGetResource<Product>(id, ENDPOINTS.PRODUCT)
  // const { groups, mutate: mutateGroups } = useGetAllGroups()
  // const { categories } = useGetAllCategories()
  const { allResource: categories, mutate } = useGetAllResource(ENDPOINTS.CATEGORY)
  const { allResource: branches } = useGetAllResource(ENDPOINTS.BRANCH)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      marca: product?.marca ?? '',
      nombre: product?.nombre ?? '',
      stock: product?.stock ?? 0,
      imagenUrl: product?.imagenUrl ?? '',
      branch_id: product?.branch?.id ?? '',
      categoria_id: product?.categoria?.id ?? '',
      precio: product?.precio ?? 0,
      // optional
      descripcion: product?.descripcion ?? undefined
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (id) {
      toast.promise(updateProduct(data), {
        loading: 'Actualizando producto...',
        success: () => {
          setTimeout(() => {
            navigate(PrivateRoutes.PRODUCT, { replace: true })
          }, 1000)
          return 'Producto actualizado exitosamente'
        },
        error(error) {
          return error.errorMessages[0] && 'Error al actualizar el producto'
        }
      })
    } else {
      toast.promise(createProduct(data), {
        loading: 'Creando producto...',
        success: () => {
          setTimeout(() => {
            navigate(PrivateRoutes.PRODUCT, { replace: true })
          }, 1000)
          return 'Producto creado exitosamente'
        },
        error(error) {
          return error.errorMessages[0] && 'Error al crear el producto'
        }
      })
    }
  }

  // let subscribe = true
  // useEffect(() => {
  //   if (subscribe && error) {
  //     toast.error(error.errorMessages[0])
  //   }
  //   return () => {
  //     subscribe = false
  //   }
  // }, [error])

  return (
    <section className="grid flex-1 items-start gap-4 lg:gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full flex flex-col gap-4 lg:gap-6"
        >
          <div className="flex items-center gap-4">
            <Button
              type="button"
              onClick={() => { navigate(-1) }}
              variant="outline"
              size="icon"
              className="h-7 w-7"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="sr-only">Volver</span>
            </Button>
            <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {title}
            </h2>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button type="button" onClick={() => { navigate(PrivateRoutes.PRODUCT) }} variant="outline" size="sm">
                Descartar
              </Button>
              <Button type="submit" size="sm">{buttonText}</Button>
            </div>
          </div>
          <div className="grid gap-4 lg:gap-6 lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_300px]">
            <div className="flex flex-col gap-4 lg:gap-6">
              <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                <CardHeader className='px-4 lg:px-6'>
                  <CardTitle>Detalles del Producto</CardTitle>
                </CardHeader>
                <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                  <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
                    <FormField
                      control={form.control}
                      name="marca"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>marca *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Adidas, Nike, Gucci, etc."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nombre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ropa, remera, corto, etc."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="descripcion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descripción del producto..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                <CardHeader className='px-4 lg:px-6'>
                  <CardTitle>Stock</CardTitle>
                  <CardDescription>
                    Establece un stock mínimo
                  </CardDescription>
                </CardHeader>
                <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock *</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder="10..."
                            {...field}
                            onChange={(e) => { field.onChange(Number(e.target.value)) }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                <CardHeader className='px-4 lg:px-6'>
                  <CardTitle>Identificadores</CardTitle>
                  <CardDescription>
                    Asigna un grupo, categoria y sucursal al que pertenece el producto
                  </CardDescription>
                </CardHeader>
                <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                  {/* <FormField
                    control={form.control}
                    name="groupsId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grupos</FormLabel>
                        <FormControl>
                          {groups && groups?.length > 0 && field.value &&
                            <MultiSelect groups={groups} value={field.value} onChange={(value) => {
                              form.setValue('groupsId', value)
                            }} mutate={mutateGroups} />
                          }
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  <div className="grid gap-4 md:grid-cols-2 lg:gap-6 w-full relative">
                    <FormField
                      control={form.control}
                      name="branch_id"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-between space-y-1 pt-1">
                          <FormLabel className='leading-normal'>Sucursal *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    'justify-between font-normal',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value
                                    ? (<span className='text-ellipsis whitespace-nowrap overflow-hidden'>
                                      {branches?.find(
                                        (branch: Branch) => branch.id === field.value
                                      )?.name}
                                    </span>)
                                    : <span className='text-light-text-secondary dark:text-dark-text-secondary text-ellipsis whitespace-nowrap overflow-hidden'>Seleccionar sucursal</span>}
                                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput placeholder="Seleccionar un producto..." />
                                <CommandList>
                                  <CommandEmpty>Sucursal no encontrada</CommandEmpty>
                                  <CommandGroup>
                                    {branches?.map((branch: Branch) => (
                                      <CommandItem
                                        value={branch.name}
                                        key={branch.id}
                                        onSelect={() => { form.setValue('branch_id', branch.id) }}
                                      >
                                        <CheckCheckIcon
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            branch.id === field.value ? 'opacity-100' : 'opacity-0'
                                          )}
                                        />
                                        {branch.name}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="categoria_id"
                      defaultValue={product?.categoria?.id}
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-between space-y-2 pt-1">
                          <FormLabel>Categoría *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    'justify-between font-normal w-full',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value
                                    ? <span className='text-ellipsis whitespace-nowrap overflow-hidden'>
                                      {categories?.find(
                                        (category: Categoria) => category.id === field.value
                                      )?.name}
                                    </span>
                                    : <span className='text-light-text-secondary dark:text-dark-text-secondary text-ellipsis whitespace-nowrap overflow-hidden'>Seleccionar categoría</span>}
                                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput placeholder="Seleccionar una categoría..." />
                                <CommandList>
                                  <CommandEmpty>Categoría no encontrada.</CommandEmpty>
                                  <CommandGroup>
                                    <CommandItem className='px-0 py-0'>
                                      <AlertDialog open={openModal} onOpenChange={(open) => { setOpenModal(open) }}>
                                        <AlertDialogTrigger asChild>
                                          <div className="flex gap-1 w-full py-1.5 pl-7 rounded-sm cursor-pointer items-center">
                                            <PlusCircleIcon className="h-4 w-4" />
                                            Agregar categoria
                                          </div>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='bg-light-bg-primary'>
                                          <CategoriesForm buttonText='Crear' title='Crear categoria' setOpenModal={setOpenModal} mutate={mutate} />
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </CommandItem>
                                  </CommandGroup>
                                  <CommandGroup>
                                    {categories?.map((category: Categoria) => (
                                      <CommandItem
                                        value={category.nombre}
                                        key={category.id}
                                        onSelect={() => {
                                          form.setValue('categoria_id', category.id)
                                          form.clearErrors('categoria_id')
                                        }}
                                      >
                                        <CheckCheckIcon
                                          className={cn(
                                            'mr-2 h-4 w-4', category.id === field.value ? 'opacity-100' : 'opacity-0'
                                          )}
                                        />
                                        {category.nombre}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:gap-6">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Estado del producto</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value === 'true')
                          }}
                          value={field.value ? 'true' : 'false'}
                          name={field.name}
                          disabled={field.disabled}
                          defaultValue={field.value ? 'true' : 'false'}
                        >
                          <FormControl>
                            <SelectTrigger aria-label="Selecciona un estado">
                              <SelectValue placeholder="Selecciona una estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='true'>Activo</SelectItem>
                            <SelectItem value='false'>Inactivo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </CardContent>
              </Card>
              <Card
                className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
              >
                <CardHeader className='pb-2'>
                  <CardTitle>Imagen</CardTitle>
                  <CardDescription>
                    Ingrese la url de la imagen del producto
                  </CardDescription>
                  {(product?.imagenUrl ?? form.watch('imagenUrl')) && <div className='pt-2 relative max-w-[300px] lg:max-w-[250px]'>
                    <img
                      src={form.watch('imagenUrl') ?? product?.imagenUrl}
                      className="rounded-md border mx-auto object-cover overflow-hidden"
                    />
                  </div>}
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="imagenUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Url de la imagen</FormLabel>
                          <FormControl>
                            <Input
                              type='string'
                              placeholder="https://example.com/image.jpg"
                              {...field}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardHeader className='pb-2'>
                  <CardTitle>Precio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="precio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio de venta Bs. *</FormLabel>
                          <FormControl>
                            <Input
                              type='number' {...field} onChange={e => { field.onChange(Number(e.target.value)) }}
                              step="0.01"
                              placeholder="0.00"

                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button onClick={() => { navigate(PrivateRoutes.PRODUCT) }} type="button" variant="outline" size="sm">
              Descartar
            </Button>
            <Button type="submit" size="sm">
              {buttonText}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}
export default ProductFormPage
