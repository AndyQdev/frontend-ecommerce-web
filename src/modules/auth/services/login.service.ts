import { STORAGE_TOKEN, STORAGE_USER, getStorage, setStorage } from '@/utils'
import { type AuthLogin } from '../models/login.model'

const userLogin = async (url: string, { arg }: { arg: AuthLogin }): Promise<any> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: { 'Content-Type': 'application/json' }
  }
  console.log(arg)
  try {
    const response = await fetch(url, options)

    // Manejo de errores: Si la respuesta no es exitosa
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Error: ${response.status} - ${errorData.message}`)
    }

    // Si es exitosa, parseamos la respuesta como JSON
    const data = await response.json()

    // Aquí puedes guardar el token JWT en localStorage o sessionStorage
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    localStorage.setItem('token', data.token)

    // Retornar datos o manejar lo que necesites con la respuesta
    return data
  } catch (error) {
    // Manejamos errores que pueden surgir
    console.error('Error en la autenticación:', error)
    throw error
  }
}

// const checkToken = async (url: string, { arg }: { arg: { token: string } }): Promise<any> => {
//   const response = await fetchData(`${url}?token=${arg.token}`)
//   if (response.statusCode === 200) {
//     setStorage(STORAGE_USER, response.data.id as string)
//   }
//   return response.data
// }
const checkToken = async (url: string): Promise<any> => {
  const token = getStorage(STORAGE_TOKEN) // Obtiene el token del almacenamiento local (localStorage o sessionStorage)

  // Si no hay token, no tiene sentido continuar
  if (!token) {
    throw new Error('Token no encontrado')
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`, // Enviamos el token en el encabezado Authorization
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Error al verificar el token')
  }

  const data = await response.json()

  if (response.status === 200) {
    setStorage(STORAGE_USER, data.id as string) // Guarda la información del usuario si el token es válido
  }

  return data
}

export { userLogin, checkToken }
