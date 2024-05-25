import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const itemsAPI = createApi({
    reducerPath: 'itemsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    tagTypes: ['Items'],
    endpoints: (builder) => ({
        getItems: builder.query({
            query: () => 'items',
            providesTags: ['Items'],
        }),
        updateItem: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `items/${id}`,
                method: 'PATCH',
                body: body,
            }),
            invalidatesTags: ['Items']
        }),
        createItem: builder.mutation({
            query: (items) => ({
                url: 'items',
                method: 'POST',
                body: items
            }),
            invalidatesTags: ['Items']
        }),
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `items/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Items']
        })
    })
})

export const { useGetItemsQuery, useCreateItemMutation, useDeleteItemMutation, useUpdateItemMutation } = itemsAPI