import { fetchData } from '@/utils/fetch-data.utils'
import { type Categoria } from '../models/catorgoria.model'

const getAllCategorias = async (url: string): Promise<Categoria[]> => {
  const response = await fetchData(url)
  return response
}

// const getPermission = async (url: string): Promise<Permission> => {
//   const response = await fetchData(url)
//   return response.data
// }

// const createPermission = async (url: string, { arg }: { arg: CreatePermission }): Promise<void> => {
//   const options: RequestInit = {
//     method: 'POST',
//     body: JSON.stringify(arg)
//   }
//   await fetchData(url, options)
// }

// const updatePermission = async (url: string, { arg }: { arg: PermissionUpdate }): Promise<void> => {
//   const options: RequestInit = {
//     method: 'PATCH',
//     body: JSON.stringify(arg)
//   }
//   await fetchData(`${url}/${arg.id}`, options)
// }

export { getAllCategorias }
