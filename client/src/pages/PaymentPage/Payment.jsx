import React, { useState, useEffect } from 'react'
import ProcessHeader from '../../component/TheProcessHeader/ProcessHeader'
import CheckoutSteps from '../../component/CheCkoutSteps/CheckoutSteps'
import { Form, Col, Button } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../slices/cartSlice'
import FormContainer from '../../component/FormContainer'
//import { useLocation } from 'react-router-dom'
const Payment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //  const { pathname } = useLocation()
    const [PaymentMethod, setPaymentMethod] = useState('PayPal')
    const cart = useSelector(state => state.cart)
    const { shippingAddress  } = cart;
    useEffect(() => {
        if(!shippingAddress) {
           navigate('/shipping')
        }
    }, [navigate, shippingAddress])
      const submitHandler = (e)=> {
         e.preventDefault()
         dispatch(savePaymentMethod(PaymentMethod))
         navigate('/place-order')
      }
  return (
    <div>
        <ProcessHeader />
        <CheckoutSteps step1 step2 step3 />
       
       <FormContainer>
       <h1>Payment Method</h1>
           <Form onSubmit={submitHandler}>
               <Form.Group>
                 <Form.Label as='legend' >
                     Select Method
                 </Form.Label>
                 <Col>
                   <Form.Check type='radio' className='my-2' label='PayPal or credit card' 
                     id='PayPal' name='PaymentMethod' 
                     value={PaymentMethod} checked onChange={(e)=> setPaymentMethod(e.target.value)}
                   ></Form.Check>
                  </Col>
               </Form.Group>
               <Button type='submit' variant='primary' className='light-btn mt-2'> 
                  Continue
               </Button>
              
              
           </Form>
       </FormContainer>
    </div>
  )
}

export default Payment