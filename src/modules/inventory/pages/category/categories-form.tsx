import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { z } from 'zod'
import { type Dispatch, type SetStateAction } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { type ApiResponse } from '@/models'
import { type IFormProps } from '@/models/form-page.model'
import { type KeyedMutator } from 'swr'
import { AlertDialogCancel, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useCreateResource, useUpdateResource } from '@/hooks/useCrud'
import { ENDPOINTS } from '@/utils'
import { type CreateCategoria } from '../../models/catorgoria.model'

const formSchema = z.object({
  nombre: z.string().min(2).max(50),
  descripcion: z.string().min(2).max(50)
})

interface ICategoryForm extends IFormProps {
  setOpenModal?: Dispatch<SetStateAction<boolean>>
  mutate: KeyedMutator<ApiResponse>
}

const CategoriesForm = ({ buttonText, title, mutate, setOpenModal }: ICategoryForm) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { id } = useParams()
  const { createResource: createCategory, isMutating } = useCreateResource<CreateCategoria>(ENDPOINTS.CATEGORY)
  const { updateResource: updateCategory, isMutating: isMutatingUpdate } = useUpdateResource<CreateCategoria>(ENDPOINTS.CATEGORY, id)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: searchParams.get('nombre') ?? '',
      descripcion: searchParams.get('descripcion') ?? ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast.promise(
      searchParams.get('id') && searchParams.get('nombre') && searchParams.get('descripcion') && searchParams.get('imagen')
        ? updateCategory(data)
        : createCategory(data),
      {
        loading: 'Cargando...',
        success: () => {
          if (mutate) {
            void mutate()
          }
          setTimeout(() => {
            searchParams.delete('id')
            searchParams.delete('nombre')
            searchParams.delete('descripcion')
            searchParams.delete('imagen')
            setSearchParams(searchParams)
            setOpenModal?.(false)
          }, 500)
          return `Categoría ${searchParams.get('id') ? 'actualizada' : 'creada'} correctamente.`
        },
        error(error) {
          return error?.errorMessages[0] ?? 'Error al crear el categoría'
        }
      })
  }

  return (
    <>
      <section className="grid flex-1 items-start gap-4 lg:gap-6">
        <Form {...form}>
          <form onSubmit={() => { }} className="mx-auto w-full flex flex-col gap-4 lg:gap-6">
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="flex flex-col gap-4 lg:gap-6" >
              <div className="grid gap-4 lg:gap-6 lg:grid-cols-1">
                <FormField
                  control={form.control}
                  name="nombre"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Tienda..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descripcion"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripcion</FormLabel>
                      <FormControl>
                        <Textarea placeholder="El usuario pordrá..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <FormField
                control={form.control}
                name="image_url"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url Imagen</FormLabel>
                    <FormControl>
                      <Input placeholder="categoria1.jpg..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
            <AlertDialogFooter className="flex items-center justify-center gap-2">
              <AlertDialogCancel asChild>
                <Button type='button' variant="outline" size="sm" onClick={() => {
                  searchParams.delete('id')
                  searchParams.delete('nombre')
                  searchParams.delete('descripcion')
                  searchParams.delete('imagen')
                  setSearchParams(searchParams)
                }}>
                  Cancelar
                </Button>
              </AlertDialogCancel>
              <Button
                type='button'
                size="sm"
                disabled={isMutating || isMutatingUpdate}
                onClick={form.handleSubmit(onSubmit)}
              > {searchParams.get('id') ? 'Actualizar' : buttonText}</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </section>
    </>
  )
}

export default CategoriesForm
