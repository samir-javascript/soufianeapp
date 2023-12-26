import React, {useState , useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './styles.css'
import { setCredentials } from '../../slices/authSlice'
import { useLoginMutation } from '../../slices/usersApi'
import { useDispatch, useSelector } from 'react-redux'
//import Loading from '../../component/LoadingComponent/Loading'
import { toast } from 'react-toastify'
import Spinner from 'react-bootstrap/esm/Spinner'
import ProcessHeader from '../../component/TheProcessHeader/ProcessHeader'
import { Helmet } from 'react-helmet-async'
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const redirect = searchParams.get('redirect') || '/'
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [login, {isLoading}] = useLoginMutation()
  const { userInfo} = useSelector(state => state.auth);
  useEffect(() => {
     if(userInfo) {
      navigate(redirect)
     }
  }, [navigate, redirect, userInfo])
  
  const handleSubmit =  async(e)=> {
      e.preventDefault()
      if(!email || !password) {
       return toast.error('All Fields Are required! ')
      }
      try { 
       const res = await login({email, password}).unwrap()
       dispatch(setCredentials({...res}))
       navigate(redirect)
      } catch (error) {
        console.log(error)
        toast.error(error?.data?.message || error?.error)
      }

  }
  return (
    <>
    <ProcessHeader />
    <Helmet>
        <title>starshiners | Login to your account on starshiners's store and start your shopping journey with us </title>
        
    </Helmet>
    <div className='login'>
      <div className='image-con'>
        <img  src="/images/auth-image.jpg" alt="auth-img" />
      </div>
       
        <div className='login-container'>
        <Link className='login-logo' to='/'>
             <img className='logo-image' alt='starshines ' src="https://stcnt.starshiners.ro/img/logo-StarShinerS.svg" />
        </Link>
            <div className='form'>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <h5>Email address</h5>
                <input  type="text" placeholder='Enter your email address' value={email} 
                   onChange={(e)=> setEmail(e.target.value) }
                />
                <h5>Password</h5>
                <input  type="password" placeholder='Enter your password'
                 onChange={(e)=> setPassword(e.target.value)}
                 value={password} />
                <button  disabled={isLoading}  type='submit' className='sign-in-button'>
                     {isLoading ? <Spinner style={{
                       width: '30px',height:'30px' , display: 'block', margin:'auto'
                     }} animation="border" role="status">
    
                     </Spinner> : "sign in"}
                </button>
            </form>
            <p className='login-paragraph'>By continuing, you agree to STARSHINERS STORE Conditions of Use and Privacy Notice.</p>
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                <button className='register-button'>Create an Account</button>
            </Link>
            </div>
          
            
        </div>
    </div>
    </>
  )
}

export default Login