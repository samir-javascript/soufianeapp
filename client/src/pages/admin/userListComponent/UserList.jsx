import React from 'react'

import { Table, Button } from 'react-bootstrap'
import Loading from '../../../component/LoadingComponent/Loading'
import Message from '../../../component/MessageComponent/Message'
import { LinkContainer } from 'react-router-bootstrap'
import './styles.css'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import { useGetUsersQuery, useDeleteUserMutation } from '../../../slices/usersApi'
import { toast } from 'react-toastify'
const UserList = () => {
    const { data: users, refetch, isLoading, error} = useGetUsersQuery()
    const [deleteUser, {isLoading:loadingDLT}] = useDeleteUserMutation()
    const deleteHandler = async(id)=> {
     try {
        await deleteUser(id)
        refetch()
         toast.success('user deleted')
     } catch (error) {
        console.log(error)
        toast.error(error?.data?.message || error?.error || error)
     }
    }
    
  return (
    <div className='orders'>
        <div className='orders-container'>

        
        <h1>Users</h1>
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
      <th className='text-center'>EMAIL</th>
      <th className='text-center'>NAME</th>
      <th className='text-center'>ADMIN</th>
      <th className='text-center'>EDIT</th>
      <th className='text-center'>DELETE</th>
      
    </tr>
  </thead>
  <tbody>
    {users.map(item => (
      <tr key={item._id}>
        <td className='text-center'>{item._id}</td>
        <td className='text-center'>{item.email}</td>
        <td className='text-center'>{item.name}</td>
        
        <td className='text-center'>
          {item.isAdmin ? (
            <FaCheck  color='green'/>
          ) : (
            <FaTimes color='red' />
          )}
        </td>
        <td className='text-center'>
          <LinkContainer to={`/admin/user/${item._id}/edit`}>
          <Button type='button' variant='light' className='btn-sm'>
             <FaEdit />
          </Button>
          </LinkContainer>
          
        </td>
        <td className='text-center'>
        <Button disabled={loadingDLT} onClick={()=> deleteHandler(item._id)} type='button' variant='light' className='btn-sm'>
             <FaTrash color='red' />
          </Button>
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

export default UserList