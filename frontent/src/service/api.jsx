// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const resumeAPI = createApi({
    reducerPath: 'resumeAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (builder) => ({
        submitForm: builder.mutation({
            query: (body) => {
                return {
                    url: '/form',
                    method: "POST",
                    body,
                }
            },
        }),
        login: builder.mutation({
            query: (body) => {
                return {
                    url: '/login',
                    method: "POST",
                    body
                }
            }
        }),
        getForms: builder.mutation({
            query: (token) => {
                return {
                    url: '/data',
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                }
            }
        })
    }),
})

export const { useSubmitFormMutation, useLoginMutation, useGetFormsMutation } = resumeAPI