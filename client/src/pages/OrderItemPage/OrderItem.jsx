import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Row, Col, ListGroup, Image, Card, Button, Spinner } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../../component/LoadingComponent/Loading'
import Message from '../../component/MessageComponent/Message'
import {  useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation} from '../../slices/ordersApi'
import { useDeliverOrderMutation } from '../../slices/ordersApi';
import { Helmet } from 'react-helmet-async';
const OrderItem = () => {
  const { id: orderId } = useParams();
const [deliver, {isLoading: loadingUpdateToDLV}] = useDeliverOrderMutation()
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();
   
   useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
        console.log(paypal.clientId)
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success('Order is paid');
       
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  // TESTING ONLY! REMOVE BEFORE PRODUCTION
  // async function onApproveTest() {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   refetch();

  //   toast.success('Order is paid');
  // }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const updateToDeliver = async()=> {
    try {
       await deliver(orderId)
       refetch()
       toast.success('Order delivered successfully')

    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message)
    }
  }

  return isLoading ? (
    <Loading />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error?.error}</Message>
  ) : (
    <>
      <Helmet>
               <title> starshiners | place your order |  Online Clothing for women</title>
                <meta name='description' content='Indulge in a world of fashion with StarShiners, where every click opens the door to a curated collection of trendy apparel. Elevate your wardrobe with the latest styles, from chic dresses to casual essentials. Experience seamless shopping and express your unique style with confidence. Dive into a realm of elegance at StarShiners – where fashion meets you' />
       </Helmet>
     
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => { 
                  
                    return ( 
                    <ListGroup.Item key={index}>
                          
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                           
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                              {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
)}  )}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card style={{height:'auto'}}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loading />}

                  {isPending ? (
                    <Loading />
                  ) : (
                    <div>
                      {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}
                      {/* <Button
                        style={{ marginBottom: '10px' }}
                        onClick={onApproveTest}
                      >
                        Test Pay Order
                      </Button> */}

                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

               {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                     <Button disabled={loadingUpdateToDLV} onClick={updateToDeliver} type='button' className='btn btn-block'>
                          {loadingUpdateToDLV ? <Spinner style={{
                       width: '30px',height:'30px' , display: 'block', margin:'auto'
                     }} animation="border" role="status">
    
                     </Spinner> : ' Mark as Delivered'}
                     </Button>
                  </ListGroup.Item>
               )}

             
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderItem;