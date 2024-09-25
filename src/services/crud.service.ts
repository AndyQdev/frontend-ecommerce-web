import { fetchData } from '@/utils'
import { type ApiResponse } from '@/models'

// const getAllResource = async (url: string): Promise<ApiResponse> => {
//   const response = await fetchData(url)
//   return response
// }

const getAllResource = async <T>(url: string): Promise<ApiResponse> => {
  const options: RequestInit = { method: 'GET' }
  const response = await fetchData(url, options)
  return { data: response as T[], countData: response.countData }
}
const getResource = async <T>(url: string): Promise<T> => {
  const response = await fetchData(url)
  return response
}

const createResource = async <T>(url: string, { arg }: { arg: T }): Promise<void> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg)
  }
  const response = await fetchData(url, options)
  return response
}

// const createUser = async (url: string, { arg }: { arg: CreateUser }): Promise<void> => {
//   console.log(arg)
//   const options: RequestInit = {
//     method: 'POST',
//     body: JSON.stringify(arg)
//   }
//   const response = await fetchData(url, options)
//   return response
// }

const updateResource = async <T>(url: string, { arg }: { arg: T }): Promise<void> => {
  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(arg)
  }
  await fetchData(`${url}`, options)
}

// const updateDispenser = async (url: string, { arg }: { arg: DispenserUpdate }): Promise<void> => {
//   const options: RequestInit = {
//     method: 'PATCH',
//     body: JSON.stringify(arg)
//   }
//   await fetchData(`${url}/${arg.id}`, options)
// }
const deleteResource = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${arg}`, options)
}

export { getAllResource, createResource, updateResource, getResource, deleteResource }
