import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { BASE_URL} from '../constants'
const baseQuery = fetchBaseQuery({baseUrl:BASE_URL }) // localhost:5000 which we have set in proxy in package.json
export const apiSlice = createApi({
  baseQuery,
  tagTypes : ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
})