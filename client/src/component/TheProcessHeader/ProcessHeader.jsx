import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
const ProcessHeader = () => {
  return (
    <header className='header-process'>
        <div className='header-process-container'>
          <Link to='/'>
             <img className='logo-image' alt='starshines ' src="https://stcnt.starshiners.ro/img/logo-StarShinerS.svg" />
          </Link>
          
             <FaArrowLeft cursor={'pointer'} onClick={ ()=>  window.location.href = '/'} size={22} className='header-process-icon' />
        </div>
        
    </header>
  )
}

export default ProcessHeader