import useSWRMutation from 'swr/mutation'
import { API_BASEURL } from '@/utils'
import { type ResponseError } from '@/utils/response-error.utils'
import useSWR from 'swr'
import { filterStateDefault, useFilterData } from '@/hooks/useFilterData'
import { type ApiResponse } from '@/models'
import { createResource, deleteResource, getAllResource, getResource, updateResource } from '@/services/crud.service'

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

const useUpdateResource = <TData>(endpoint: string, id?: string) => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, TData>(
    API_BASEURL + endpoint + `/${id}`,
    updateResource
  )
  return { updateResource: trigger, isMutating, error }
}

const useDeleteResource = (endpoint: string) => {
  const { trigger, error, isMutating } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + endpoint, deleteResource)
  return { deleteResource: trigger, error, isMutating }
}

export { useCreateResource, useGetAllResource, useGetResource, useUpdateResource, useDeleteResource }
