import React, {useState, useEffect} from 'react'
import { Link, useNavigate , useLocation} from 'react-router-dom'
import { useRegisterMutation } from '../../slices/usersApi'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../../slices/authSlice'
import './styles.css'
import Spinner from 'react-bootstrap/esm/Spinner'
import ProcessHeader from '../../component/TheProcessHeader/ProcessHeader'
import { Helmet } from 'react-helmet-async'
const Register = () => {
 const dispatch = useDispatch()
 const { userInfo } = useSelector(state=> state.auth)
 const { search} = useLocation()
 const navigate = useNavigate()
 const searchParams = new URLSearchParams(search)
 const redirect = searchParams.get('redirect') || '/'
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [registerUser,  { isLoading }] = useRegisterMutation()
  useEffect(() => {
    if(userInfo) {
      navigate(redirect)
    }
  }, [userInfo,navigate,redirect])
  
  const handleSubmit = async (e)=> {
      e.preventDefault()
      if(password !== confirmPassword) {
        toast.error('passwords do not match')
        return
      }else {
        try {
       
          const res =  await registerUser({name, email, password}).unwrap()
          dispatch(setCredentials({...res}))
          navigate(redirect)
        } catch (error) {
           console.log(error)
           toast.error(error?.data?.message || error?.error)
        }
      }
      
  }
  return (
    <>
    <ProcessHeader />
    <Helmet>
        <title>starshiners | Register account on starshiners's store </title>
        
    </Helmet>
    <div className='login'>
      <div className='image-con'>
        <img  src="/images/auth-image.jpg" alt="" />
      </div>
       
        <div className='login-container'>
        <Link className='login-logo' to='/'>
             <img className='logo-image' alt='starshines ' src="https://stcnt.starshiners.ro/img/logo-StarShinerS.svg" />
        </Link>
            <div className='form'>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
            <h5>Full Name</h5>
                <input required type="text" placeholder='Enter your Full Name' value={name} 
                   onChange={(e)=> setName(e.target.value) }
                />
                <h5>Email address</h5>
                <input required type="text" placeholder='Enter your email address' value={email} 
                   onChange={(e)=> setEmail(e.target.value) }
                />
                <h5>Password</h5>
                <input required type="password" placeholder='Enter your password'
                 onChange={(e)=> setPassword(e.target.value)}
                 value={password} />
                 <h5>Confirm Password</h5>
                <input required type="password" placeholder='Re-enter your password'
                 onChange={(e)=> setConfirmPassword(e.target.value)}
                 value={confirmPassword} />
                <button  disabled={isLoading}  type='submit' className='sign-in-button'>
                {isLoading ? <Spinner style={{
                       width: '30px',height:'30px' , display: 'block', margin:'auto'
                     }} animation="border" role="status">
    
                     </Spinner> : "Register"}
                </button>
            </form>
            <p className='login-paragraph'>By continuing, you agree to STARSHINERS STORE Conditions of Use and Privacy Notice.</p>
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                <button className='register-button'>Sign in</button>
            </Link>
            </div>
          
            
        </div>
    </div>
    </>
  )
}

export default Register