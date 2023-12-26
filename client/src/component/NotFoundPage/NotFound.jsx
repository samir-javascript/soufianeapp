import { Link } from 'react-router-dom'
import './styles.css'
import { Helmet } from 'react-helmet-async'
const NotFound = () => {
  return (
    <div className='notfound-container'>
         <Helmet>
        <title>starshiners | 404 Not found Page  </title>
        <meta name='description' content={''} />
    </Helmet>
        <div className='notfound-wrapper'>
            <div className='notfound'>

            
             <img style={{objectFit:'contain'}}  src={'/images/mmall-404_1-removebg-preview.png'} alt="not found img indicator" />
             <h2 className='notfound-heading'>Oops! The page you are looking for doesn't exist.</h2>
             <p>You may find what you like in the Links below:</p>
             <div className='btn-container'>
                <Link to='/'>
                 <button className='btn-404'>
                    Home Page
                 </button>
                 </Link>
                 <Link to='/browse-products/Electronics'>
                 <button className='btn-404'>
                     Browse categories
                 </button>
                 </Link>
             </div>
             </div>
        </div>
    </div>
  )
}

export default NotFound