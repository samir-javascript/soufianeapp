import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  FaTimes } from 'react-icons/fa'
import './styles.css'
import { toast } from 'react-toastify'
import { useProfileMutation } from '../../slices/usersApi'
import { Col, Row, Button, Table, Form, Spinner } from 'react-bootstrap'
import Loading from '../../component/LoadingComponent/Loading'
import Message from '../../component/MessageComponent/Message'
import { useGetUserOrdersQuery } from '../../slices/ordersApi'
import { setCredentials } from '../../slices/authSlice'
import { LinkContainer } from 'react-router-bootstrap'
const Profile = () => {
    const { data: myorders, isLoading, error} = useGetUserOrdersQuery()
   
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.auth);
    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()
   
  useEffect(() => {
      if(userInfo) {
        setName(userInfo.name)
        setEmail(userInfo.email)
      }
  }, [userInfo])
  const handleSubmit = async(e)=> {
    e.preventDefault()
    if(password !== confirmPassword) {
        toast.error('Passwords do not match')
    }else {
        try {
            const res = await updateProfile({_id: userInfo._id, name , email, password});
            dispatch(setCredentials(res))
            setPassword('')
            setConfirmPassword('')
            toast.success('Profile updated successfully')
        } catch (error) {
            console.log(error?.data?.message || error?.error)
        }
    }
}
  
 
  return (
    <div className='profile'>
    <Row className='mx-4 py-3'>
        <Col md={3}>
            <h2>User Profile</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='name' className='my-2'>
                    <Form.Label >
                       Name
                    </Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' value={name} 
                      onChange={(e)=> setName(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='my-2'>
                    <Form.Label >
                       Email Address
                    </Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} 
                      onChange={(e)=> setEmail(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label >
                       Password
                    </Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} 
                      onChange={(e)=> setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='my-2'>
                    <Form.Label >
                      Confirm Password
                    </Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} 
                      onChange={(e)=> setConfirmPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Button disabled={loadingUpdateProfile} type='submit' className='my-2' variant='primary'>
                    {loadingUpdateProfile ? <Spinner style={{
                       width: '30px',height:'30px' , display: 'block', margin:'auto'
                     }} animation="border" role="status">
    
                     </Spinner> : 'Update Profile'}
                </Button>
            </Form>
        </Col>
        <Col md={9}>
             <h2>My Orders</h2>
             {isLoading ? (
                <Loading />
             ): error ? <Message variant='danger'> 
                  {error?.data?.message || error?.error}
             </Message> : (
              <Table striped hover responsive bordered className='table-sm'>
              <thead>
                <tr>
                  <th className='text-center'>ID</th>
                  <th className='text-center'>DATE</th>
                  <th className='text-center'>TOTAL</th>
                  <th className='text-center'>PAID</th>
                  <th className='text-center'>DELIVERED</th>
                  <th className='text-center'>MY ORDERS </th>
                </tr>
              </thead>
              <tbody>
                {myorders.map((order) => (
                  <tr key={order._id}>
                    <td className='text-center'>{order._id}</td>
                    <td className='text-center'>{order.createdAt.substring(0, 10)}</td>
                    <td className='text-center'>$ {order.totalPrice}</td>
                    <td className='text-center'>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td className='text-center'>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td className='text-center'>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                           Order Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
             )}
          </Col>   
    </Row>
    </div>
  )
}

export default Profile