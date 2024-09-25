import useSWR from 'swr'
import { type ResponseError } from '@/utils/response-error.utils'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { getAllCategorias } from '../services/permissions.service'
import { type Categoria } from '../models/catorgoria.model'

const useGetAllCategorias = () => {
  const { data, isLoading, error, mutate } = useSWR<Categoria[], ResponseError>(API_BASEURL + ENDPOINTS.CATEGORY, getAllCategorias)

  return { categorias: data, isLoading, error, mutate }
}

// const useCreatePermission = () => {
//   const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreatePermission>(API_BASEURL + ENDPOINTS.PERMISSION, createPermission)
//   return { createPermission: trigger, isMutating, error }
// }

// const useGetPermission = (id?: string) => {
//   const { data, isLoading, error, isValidating } = useSWR<Permission, ResponseError>(id ? API_BASEURL + ENDPOINTS.PERMISSION + `/${id}` : null, getPermission)
//   return { permission: data, isLoading, error, isValidating }
// }

// const useUpdatePermission = () => {
//   const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, PermissionUpdate>(API_BASEURL + ENDPOINTS.PERMISSION, updatePermission)
//   return { updatePermission: trigger, isMutating, error }
// }

export { useGetAllCategorias }
