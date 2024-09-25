import { STORAGE_TOKEN, getStorage } from '.'
import { type ApiResponse, type FilterOptions } from '../models'
import { ResponseError } from './response-error.utils'

export const generateQueryParams = ({ offset, limit, order, ...rest }: FilterOptions): string => {
  const queryParams = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
    order: order.toString()
  })

  Object.entries(rest).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value.toString())
    }
  })

  return queryParams.toString()
}

export const handleResponseErrors = async (response: Response) => {
  if (!response.ok) {
    const errorResponse: ApiResponse = await response.json()
    const error = new ResponseError('Ocurrio un error al realizar la solicitud', errorResponse)
    throw error
  }
}

export const fetchData = async (url: string, options?: RequestInit, typeBlob?: boolean) => {
  // Obtén el token JWT almacenado (por ejemplo, en localStorage)
  const token = getStorage(STORAGE_TOKEN) // Aquí obtienes el token JWT que has almacenado en el navegador
  const authorizationHeader = { Authorization: `Bearer ${token}` }

  // Configura las opciones de la solicitud, incluyendo el token en el encabezado
  const requestOptions: RequestInit = {
    ...options,
    headers: {
      ...options?.headers,
      ...authorizationHeader
    }
  }

  // Asegúrate de que el encabezado Content-Type sea adecuado si no estás enviando FormData
  if (!options || (options && !(options.body instanceof FormData))) {
    requestOptions.headers = {
      ...requestOptions.headers,
      'Content-Type': 'application/json'
    }
  }

  // Realiza la solicitud usando fetch
  const response = await fetch(url, requestOptions)
  console.log(response) // Solo para verificar la URL y las opciones que se están enviando

  // Maneja errores de la respuesta
  await handleResponseErrors(response)
  // Si la respuesta es 204 (No Content), devolver null o simplemente no intentar parsear el cuerpo

  // Si no se espera un archivo blob, devuelve la respuesta en formato JSON
  return !typeBlob ? await response.json() : response
}

type QueryOptions = Record<string, string | number | undefined>

export const generateQueryParamsGeneric = (queryOption: QueryOptions): string => {
  const queryParams = new URLSearchParams()

  for (const key in queryOption) {
    if (queryOption[key] !== undefined) {
      queryParams.append(key, queryOption[key].toString())
    }
  }

  return queryParams.toString()
}
