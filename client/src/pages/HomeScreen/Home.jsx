
//import products from '../../products'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Loading from '../../component/LoadingComponent/Loading'
import ProductCard from '../../component/ProductCardComponent/ProductCard'
import { useGetProductsQuery } from '../../slices/productsApi'
import Message from '../../component/MessageComponent/Message'
import './styles.css'
import ProductCarousel from '../../component/ProductCarouselComponent/ProductCarousel'
import Paginate from '../../component/PaginateComponent/Paginate'
import { Button } from 'react-bootstrap'

import CategorySlider from '../../component/CategorySliderComponent/CategorySlider'
import Showcase from '../../component/showcaseComponent/Showcase'

const Home = () => {
  const {keyword, pageNumber, categoryName } = useParams()
  const { data, isLoading, error} = useGetProductsQuery({ keyword,pageNumber, categoryName})
 
     if(isLoading) return <Loading />;
     if(error) return <Message variant={'danger'}>{error?.data?.message || error?.error}</Message>
  return (
    <div className='pro-carousel'> 
    <Helmet>
        <title> starshiners | Online Clothing for women</title>
        <meta name='description' content='Indulge in a world of fashion with StarShiners, where every click opens the door to a curated collection of trendy apparel. Elevate your wardrobe with the latest styles, from chic dresses to casual essentials. Experience seamless shopping and express your unique style with confidence. Dive into a realm of elegance at StarShiners – where fashion meets you' />
    </Helmet>
        <ProductCarousel />
        {keyword  && (
          <Link  to='/'>
              <Button className='btn btn-light m-3'>
                 Go Back
              </Button>
          </Link>
        )}
        {!keyword && <CategorySlider />}
         
        {!keyword && <Showcase />} 
        <h1 style={{margin: '20px'}}>{keyword ? `search results for "${keyword}"` : "Latest Products"} </h1>
        <div className='card-grid-container'>
         {data?.products.map(product =>(
           
                <ProductCard product={product} key={product._id} />
         ))}
           </div>
            <Paginate  keyword={keyword} pages={data.pages} page={data.page} /> 
            

    </div>
  )
}

export default Home