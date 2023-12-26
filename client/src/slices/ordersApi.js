import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

export const ordersSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder : builder.mutation({
            query: (order)=> ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order},
            }),   
        }),
        getUserOrders : builder.query({
            query: ()=> ({
                url: `${ORDERS_URL}/myorders`,
            }),   
            keepUnusedDataFor: 5
        }),
        getOrderDetails : builder.query({
            query: (orderId)=> ({
                url: `${ORDERS_URL}/${orderId}`,
                
            }),   
            keepUnusedDataFor: 5,
        }),
        payOrder : builder.mutation({
            query: ({orderId,details})=> ({
                url: `${ORDERS_URL}/${orderId}/pay`,
               method: 'PUT',
                body: details
            }),   
           
        }),
        deliverOrder : builder.mutation({
            query: (orderId)=> ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
               method: 'PUT',
            }),   
           
        }),
        getAllOrders : builder.query({
            query: ()=> ({
                url: ORDERS_URL,
            }),   
            keepUnusedDataFor: 5
           
        }),
        getPayPalClientId: builder.query({
            query: () => ({
              url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
          }),
      }),
})


export const { useCreateOrderMutation,
     useGetOrderDetailsQuery, useGetUserOrdersQuery, useDeliverOrderMutation,
      useGetPayPalClientIdQuery, usePayOrderMutation, useGetAllOrdersQuery} = ordersSlice;