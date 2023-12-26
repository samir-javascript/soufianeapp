import React from 'react'
import { useGetAllOrdersQuery} from '../../../slices/ordersApi'
import { Table, Button } from 'react-bootstrap'
import Loading from '../../../component/LoadingComponent/Loading'
import Message from '../../../component/MessageComponent/Message'
import { LinkContainer } from 'react-router-bootstrap'
import './styles.css'
import { FaTimes } from 'react-icons/fa'
const OrderList = () => {
    const { data: orders, isLoading, error} = useGetAllOrdersQuery()
    console.log(orders)
  return (
    <div className='orders'>
        <div className='orders-container'>

        
        <h1>Orders</h1>
        {isLoading ? (
            <Loading />
        ): error ? (
            <Message variant='danger'>
               {error?.data?.message || error?.error}
            </Message>
        ): (
            <Table responsive hover striped bordered className='table-sm'>
  <thead>
    <tr>
      <th className='text-center'>ID</th>
      <th className='text-center'>USER</th>
      <th className='text-center'>DATE</th>
      <th className='text-center'>TOTAL</th>
      <th className='text-center'>PAID</th>
      <th className='text-center'>DELIVERED</th>
      <th className='text-center'>Orders Details</th>
    </tr>
  </thead>
  <tbody>
    {orders.map(item => (
      <tr key={item._id}>
        <td className='text-center'>{item._id}</td>
        <td className='text-center'>{item.user.name}</td>
        <td className='text-center'>{item.createdAt.substring(0, 10)}</td>
        <td className='text-center'>${item.totalPrice}</td>
        <td className='text-center'>
          {item.isPaid ? (
            item.paidAt.substring(0, 10)
          ) : (
            <FaTimes color='red' />
          )}
        </td>
        <td className='text-center'>
          {item.isDelivered ? (
            item.deliveredAt.substring(0, 10)
          ) : (
            <FaTimes color='red' />
          )}
        </td>
        <td className='text-center'>
            <LinkContainer to={`/order/${item._id}`}>
                <Button className='btn-sm ' variant='light'>
                    View Order
                </Button>
            </LinkContainer>
        </td>
      </tr>
    ))}
  </tbody>
</Table>

        )}
        </div>
    </div>
  )
}

export default OrderList