// import logo from '@assets/images/logoW.webp'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks'
import Loading from '@/components/shared/loading'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string({ message: 'El correo electrónico es requerido' })
    .min(2, 'El correo electrónico debe tener al menos 2 caracteres')
    .max(50, 'El correo electrónico debe tener menos de 50 caracteres'),
  password: z.string().min(1, 'La contraseña es requerida')
})
const LoginPage = (): JSX.Element => {
  const { signWithEmailPassword, isMutating, error } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: any) => {
    void signWithEmailPassword({
      username: data.email,
      password: data.password
    })
  }

  return (
    <div className="flex flex-col bg-light-secondary">
      {/* Contenido principal */}
      <main className="flex-grow flex min-h-screen items-center justify-center py-12">
          <div className="grid w-[350px] gap-6">
            <Card className="relative">
              <CardHeader className='relative'>
                <CardTitle className="text-center">FashionScape</CardTitle>
                <CardDescription className='text-center'>
                  Ingrese su correo electrónico a continuación para iniciar sesión en su cuenta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {error && <div className="text-red-500 text-center">{error}</div>}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo electrónico</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="ejemplo@gmail.com" required {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="********" required {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <CardDescription className='pt-4'>
                      <a href="">
                        Olvidaste tu contraseña?
                      </a>
                    </CardDescription>
                    <Button type="submit" disabled = {isMutating} className="w-full mt-4">
                      {isMutating ? <Loading /> : 'Iniciar sesión'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            <div>
              <h1>Nota: Para ingresar colocar este correo y contraseña:</h1>
              <div>correo: admin@gmail.com</div>
              <div>contraseña: 123456</div>
            </div>
          </div>
      </main>
      {/* <SiteFooter /> */}
    </div>
  )
}

export default LoginPage
