import React from 'react'
import { useGetProductsQuery } from '../../../slices/productsApi'
import { Row, Col, Button, Table, Spinner, } from 'react-bootstrap'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Loading from '../../../component/LoadingComponent/Loading'
import Message from '../../../component/MessageComponent/Message'
import './styles.css'
import { LinkContainer } from 'react-router-bootstrap'
import { useCreateProductMutation, useDeleteProductMutation } from '../../../slices/productsApi'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Paginate from '../../../component/PaginateComponent/Paginate'
const ProductList = () => {
   const {pageNumber} = useParams()
    const { data, isLoading, error, refetch} = useGetProductsQuery({pageNumber})
    const [deleteProduct, {isLoading:loadingDelete}] = useDeleteProductMutation()
    const [createProduct, {isLoading:loadingCreateProduct, error:errorCreatingProduct}] = useCreateProductMutation()
    const deleteHandler = async(id)=> {
         try {
            await deleteProduct(id)
            refetch()
            toast.success('Product Deleted')
         } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || error || error?.error)
         }
    }
    const createProductHandler =async ()=> {
       try {
          await createProduct()
          refetch()
           toast.success('Product Created')
       } catch (error) {
          console.log(error)
          toast.error(error?.data?.message || error?.message)
       }
    }
  return (
    <div className='products-list'>
        <Row className='align-items-center m-4'>
             <Col>
                 <h1>Products</h1>
             </Col>
             <Col className='text-end'>
                 <Button disabled={loadingCreateProduct} onClick={createProductHandler} className='btn-sm m-3'>
                    {loadingCreateProduct ?  <Spinner style={{
                       width: '30px',height:'30px' , display: 'block', margin:'auto'
                     }} animation="border" role="status">
    
                     </Spinner> : <> <FaEdit /> Create Product </>} 
                 </Button>
             </Col>
             {errorCreatingProduct && (
                <Message variant='danger'>
                   {errorCreatingProduct?.data?.message || errorCreatingProduct?.error}
                </Message>
             )}
        </Row>
         {isLoading ? <Loading /> : error ? 
         <Message variant='danger'>{error?.data?.message || error?.error} </Message>: 

         <div className='products-list'>
            <div className='table-container'>
            <Table striped hover responsive bordered className='table-sm'>
  <thead>
    <tr>
      <th className='text-center'>ID</th>
      <th className='text-center'>NAME</th>
      <th className='text-center'>PRICE</th>
      <th className='text-center'>CATEGORY</th>
      <th className='text-center'>BRAND</th>
      <th className='text-center'>QTY</th>
      <th className='text-center'>Edit</th>
      <th className='text-center'>Delete</th>
    </tr>
  </thead>
  <tbody>
    {data.products.map(item => (
      <tr key={item._id}>
        <td className='text-center'>{item._id}</td>
        <td className='text-center'>{item.name}</td>
        <td className='text-center'>$ {item.price}</td>
        <td className='text-center'>{item.category}</td>
        <td className='text-center'>{item.brand}</td>
        <td className='text-center'>{item.countInStock}</td>
        <td className='text-center'>
    <LinkContainer to={`/admin/product/${item._id}/edit`}>
         <Button className='btn-sm' variant='light'>
            <FaEdit />
         </Button>
     </LinkContainer>
        </td>
        <td className='text-center'>
   
         <Button disabled={loadingDelete} onClick={()=> deleteHandler(item._id)} className='btn-sm' variant='light'>
            <FaTrash color='red' />
         </Button>
    
        </td>
      </tr>
    ))}
  </tbody>
</Table>

<Paginate pages={data.pages} page={data.page} isAdmin={true} />

           </div>
         </div>
        
        }
    </div>
  )
}

export default ProductList