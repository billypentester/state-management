import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoriesAPI = createApi({
    reducerPath: 'categoriesAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'categories',
            providesTags: ['Categories'],
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `categories/${id}`,
                method: 'PATCH',
                body: body,
            }),
            invalidatesTags: ['Categories']
        }),
        createCategory: builder.mutation({
            query: (category) => ({
                url: 'categories',
                method: 'POST',
                body: category
            }),
            invalidatesTags: ['Categories']
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `categories/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Categories']
        })
    })
})

export const { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = categoriesAPI