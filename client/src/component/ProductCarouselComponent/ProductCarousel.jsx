import React, { useEffect, useState } from 'react'
import { useGetTopRatedProductsQuery } from '../../slices/productsApi'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Message from '../MessageComponent/Message'
import Loading from '../LoadingComponent/Loading'
import { useParams } from 'react-router-dom'
import './styles.css'
const ProductCarousel = () => {
  const {keyword} = useParams()
  const {data:products, isLoading, error} = useGetTopRatedProductsQuery()
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);
  if(keyword) return null;
    
   
 
  return (
    <div className='pro-carousel'>


    <Carousel pause='hover' className='mb-4'>
   
            
            <Carousel.Item>
               <Link>
                  <Image src={isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/homeslider_FINDANNEE/mobile_pem_output_image_36_.webp' : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/homeslider_FINDANNEE/desktop_pem_output_image_35_.webp"} fluid alt={"any"} />
                 {/** <source media="(max-width:768px)" srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/homeslider_FINDANNEE/mobile_pem_output_image_36_.webp"> */}
               </Link>
            </Carousel.Item>
           
            <Carousel.Item>
               <Link>
                  <Image src={ isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/homeslider_FINDANNEE/output_image_32__1.webp' :  "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/homeslider_FINDANNEE/output_image_34__1.webp"} alt={"any"} fluid />
                  
               </Link>
            </Carousel.Item>
       
    </Carousel>
    </div>
  )
}

export default ProductCarousel