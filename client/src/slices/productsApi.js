import { apiSlice } from "./apiSlice";
import {  PRODUCTS_URL, UPLOADS_URL } from "../constants";

export const productsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts : builder.query({
            query: ({keyword, pageNumber})=> ({
                url: PRODUCTS_URL,
                params: {
                  keyword,
                  
                  pageNumber
                },
            }),
            keepUnusedDataFor: 5
        }),
        

       
        createProduct : builder.mutation({
            query: ()=> ({
                url: PRODUCTS_URL,
                method: 'POST'
            }),
           invalidatesTags:['Product']
        }),
        deleteProduct : builder.mutation({
            query: (id)=> ({
                url: `${PRODUCTS_URL}/${id}`,
                method: 'DELETE'
            }),
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
              url: `${PRODUCTS_URL}/${data.productId}`,
              method: 'PUT',
              body: data,
            }),
            invalidatesTags: ['Product'],
          }),
          createProductReview: builder.mutation({
            query: (data) => ({
              url: `${PRODUCTS_URL}/${data.productId}/reviews`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags: ['Product'],
          }),
          getTopRatedProducts: builder.query({
            query: () => ({
              url: `${PRODUCTS_URL}/top`,
            }),
           keepUnusedDataFor: 5,
          }),
          getProductsCategory: builder.query({
            query: (categoryName) => ({
               url: `${PRODUCTS_URL}/category/${categoryName}`,
            }),
           keepUnusedDataFor: 5,
          }),
          uploadProductImage: builder.mutation({
            query: (data) => ({
              url: UPLOADS_URL,
              method: 'POST',
              body: data,
            }),
          }),
        getSingleProduct : builder.query({
            query: (id)=> ({
                url: `${PRODUCTS_URL}/${id}`
            }),
            keepUnusedDataFor: 5
        }),
        
        
    }),
})

export const {useGetProductsQuery , useGetProductsCategoryQuery,  useGetSingleProductQuery, useDeleteProductMutation, useCreateProductReviewMutation,
     useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useGetTopRatedProductsQuery} = productsSlice;