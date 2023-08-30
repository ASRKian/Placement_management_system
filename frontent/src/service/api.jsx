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
        }),
        sendEmail: builder.mutation({
            query: ({ email, token }) => {
                return {
                    url: "/send-mail",
                    method: "POST",
                    body: { "email": email },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                }
            }
        }),
        updateForm: builder.mutation({
            query: ({ _id, token }) => {
                return {
                    url: '/setSelection',
                    method: 'PATCH',
                    body: { "id": _id },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                }
            }
        }),
        deleteForm: builder.mutation({
            query: ({ _id, token }) => {
                return {
                    url: '/deleteForm',
                    method: 'DELETE',
                    body: { "id": _id },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                }
            }
        })
    }),
})

export const { useSubmitFormMutation, useLoginMutation, useGetFormsMutation, useSendEmailMutation, useUpdateFormMutation, useDeleteFormMutation } = resumeAPI