import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const ProfileApi = createApi({
  reducerPath: 'ProfileApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),
  endpoints: (builder) => ({
    saveProfile: builder.mutation({ 
      query: (profile) => {
        return {
            url: 'resume/',
            method: 'POST',
            body: profile
        }
      }
    }),
  }),
})

export const { useSaveProfileMutation } = ProfileApi