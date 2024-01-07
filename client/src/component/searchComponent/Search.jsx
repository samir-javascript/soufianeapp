import React, {useState} from 'react'
import { FaSearch } from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom'
import { IoCloseOutline } from "react-icons/io5";
import './styles.css'
const Search = () => {
    const {keyword: keywordUrl} = useParams()
    const navigate = useNavigate()
    const [keyword,setKeyword] = useState(keywordUrl || '')
    const handleSearch = ()=> {
         if(keyword.trim())  {
            navigate(`/search/${keyword}`)
            setKeyword('')
         }else {
            navigate('/')
         }
    }
    //header-search
  return (
      <div className={ "header-search"}>
       
           <input onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
           }} className='header-input' type="text" value={keyword} 
            onChange={(e)=> setKeyword(e.target.value)}
           placeholder='Search on Starshiner'  />
            {keyword ? <IoCloseOutline onClick={()=> setKeyword('')} size={22} className='search-icon' /> : <FaSearch size={22} className='search-icon' /> } 
      
          
        </div>
  )
}

export default Search