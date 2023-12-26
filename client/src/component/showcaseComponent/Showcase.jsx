import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
const Showcase = () => {
  return (
    <section className='showcase'>
          <div className='showcase-container'>
              <Link style={{textDecoration:'none'}} to='/browse-products/Electronics' className='showcase-item'>
              <div className='overlay' />
                   <img src="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/home_30_11/jvc_output_image_4_.webp" alt="" />
                   <div className='top-info'>
                       <h3>Votre music, <br /> votre passion</h3>
                       
                   </div>
              </Link>
              <Link to='/browse-products/Beauté%20-%20Santé' className='showcase-item'>
              <div className='overlay' />
              <img src="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/homeslider_FINDANNEE/output_image_31_.webp" alt="" />
                   <div className='top-info'>
                       <h3>Votre music, <br /> votre passion</h3>
                   </div>
              </Link>
              <Link to='/browse-products/maison-cuisine-deco' className='showcase-item'>
                <div className='overlay' />
                <img  src="https://www.marjanemall.ma/media/wysiwyg/EOY/AEG_purificateur_Aspirateur_wbep.webp" alt="" />
                   <div className='top-info'>
                       <h3>Votre music, <br /> votre passion</h3>
                       
                   </div>
              </Link>
          </div>
    </section>  
  )
}
//<img class="showcase-slider-image" src="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/home_30_11/jvc_output_image_4_.webp" alt="">
export default Showcase