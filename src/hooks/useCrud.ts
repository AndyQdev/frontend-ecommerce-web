import useSWRMutation from 'swr/mutation'
// import { getAllUser } from '../services/user.service'
import { API_BASEURL } from '@/utils'
import { type ResponseError } from '@/utils/response-error.utils'
// import { type User, type CreateUser, type UpdateUser } from '../models/user.model'
import useSWR from 'swr'
import { filterStateDefault, useFilterData } from '@/hooks/useFilterData'
import { type ApiResponse } from '@/models'
import { createResource, getAllResource, getResource } from '@/services/crud.service'

// const useCreateUser = <T, TResponse>(endpoint: string, service: TResponse) => {
//   const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, T>(API_BASEURL + endpoint, service)
//   return { createUser: trigger, isMutating, error }
// }

const useCreateResource = <TData>(endpoint: string) => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, TData>(
    API_BASEURL + endpoint,
    createResource
  )

  return { createResource: trigger, isMutating, error }
}
const useGetResource = <TData>(id?: string, endpoint?: string) => {
  const { data, isLoading, error, isValidating } = useSWR<TData, ResponseError>(id ? API_BASEURL + endpoint + `/${id}` : null, getResource)
  return { resource: data, isLoading, error, isValidating }
}

const useGetAllResource = (endpoint: string) => {
  const { changeOrder, filterOptions, newPage, prevPage, queryParams, search, setFilterOptions, setOffset } = useFilterData(filterStateDefault)
  const { data, error, isLoading, mutate } = useSWR<ApiResponse, ResponseError>(`${API_BASEURL + endpoint}?${queryParams}`, getAllResource)
  return { allResource: data?.data ?? [], countData: data?.countData ?? 0, error, isLoading, mutate, changeOrder, filterOptions, newPage, prevPage, search, setFilterOptions, setOffset }
}

// const useUpdateUser = () => {
//   const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, UpdateUser>(API_BASEURL + ENDPOINTS.USER, updateUser)
//   return { updateUser: trigger, isMutating, error }
// }

// const useDeleteUser = () => {
//   const { trigger, error, isMutating } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.USER, deleteUser)
//   return { deleteUser: trigger, error, isMutating }
// }

// const useDeleteRole = () => {
//   const { trigger, error, isMutating } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.ROLE, deleteRole)
//   return { deleteRole: trigger, error, isMutating }
// }

export { useCreateResource, useGetAllResource, useGetResource }
