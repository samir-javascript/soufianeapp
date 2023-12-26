import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetProductsCategoryQuery } from '../../slices/productsApi'
import { useCategoryNames} from '../../constants'
import './styles.css'
import ProductCard from '../../component/ProductCardComponent/ProductCard'
import Loading from '../../component/LoadingComponent/Loading'
import Message from '../../component/MessageComponent/Message'
import { Helmet } from 'react-helmet-async'
const Category = () => {
   
   const { category } = useParams()
   const categoryBanner = useCategoryNames().find(item => item.name === category)
   const { data:products, isLoading} = useGetProductsCategoryQuery(category);
   
   if(isLoading) return <Loading />
  
  return (
    <div>
      <Helmet>
        <title>starshiners | {categoryBanner.name} category </title>
        <meta name='description' content={''} />
    </Helmet>
        <div>
         <div className='category-link-container'>
         <div className='category-top-link'>
               <Link to='/'>Home </Link>
               <span > &gt; </span>
               <p>{category}</p>
           </div>
         </div>
            <div className='gategory-banner-image'>
                <img src={categoryBanner.imageBanner} alt={categoryBanner.name} />
            </div>
            <div className='products-category-wrapper'>
                <h1>{category} Collections </h1>
                <div className='card-grid-container'>
              {products && products.slice(0,8).map(product =>(
           
                <ProductCard product={product} numberOfProducts key={product._id} />
         ))}
           </div>
            {categoryBanner.showcaseImage &&  (
              <div className='image-sport'>
                <img class="custom-banner-image" src={categoryBanner.showcaseImage} alt="" />
             </div>
            )}

              <div className='card-grid-container'>
              {products && products.slice(8).map(product =>(
           
                <ProductCard product={product} numberOfProducts key={product._id} />
         ))}
           </div>
             
            </div>
            
        </div>
    </div>
  )
}

export default Category