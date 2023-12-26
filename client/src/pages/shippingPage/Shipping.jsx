import React, { useEffect, useState } from 'react';
import ProcessHeader from '../../component/TheProcessHeader/ProcessHeader';
import Select from 'react-select';
import './styles.css';
//import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../../slices/cartSlice';
import CheckoutSteps from '../../component/CheCkoutSteps/CheckoutSteps';
import { toast} from 'react-toastify'
const Shipping = () => {
  //const { cartItems} = useSelector(state  => state.cart)
  const { userInfo} = useSelector(state  => state.auth)
  //const baseUrl = 'http://localhost:5000';
   //console.log(cartItems.map(item => item.qty))
   
   const navigate = useNavigate()
  const dispatch = useDispatch();
    
 
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  useEffect(() => {
    if(!userInfo) {
      navigate('/login')
    }
  }, [navigate,userInfo])
  
  const countryOptions = [
    { value: 'us', label: 'United States', },
    { value: 'ca', label: 'Canada' ,},
    { value: 'ma', label: 'Morocco' ,},
    { value: 'ar', label: 'Argentina' },
    { value: 'au', label: 'Australia' },
    { value: 'br', label: 'Brazil' },
    { value: 'cn', label: 'China' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
    { value: 'in', label: 'India' },
    { value: 'id', label: 'Indonesia' },
    { value: 'it', label: 'Italy' },
    { value: 'jp', label: 'Japan' },
    { value: 'mx', label: 'Mexico' },
    { value: 'ng', label: 'Nigeria' },
    { value: 'pk', label: 'Pakistan' },
    { value: 'ph', label: 'Philippines' },
    { value: 'ru', label: 'Russia' },
    { value: 'sa', label: 'Saudi Arabia' },
    { value: 'za', label: 'South Africa' },
    { value: 'kr', label: 'South Korea' },
    { value: 'es', label: 'Spain' },
    { value: 'se', label: 'Sweden' },
    { value: 'ch', label: 'Switzerland' },
    { value: 'tr', label: 'Turkey' },
    { value: 'ae', label: 'United Arab Emirates' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'vn', label: 'Vietnam' },
    // Add more countries as needed
  ];
  

  const submitHandler = async(e) => {
    e.preventDefault();
    setLoading(true); 
    if(!address || !country || !city || !postalCode) {
      toast.error('All fields are required!')
      return
    }
    dispatch(
      saveShippingAddress({
        address,
        country,
        city,
        postalCode,
      })
    );
    navigate('/payment')
    /*try {
      const response = await axios.post('http://localhost:5000/checkout', {
        items: cartItems.map(item => ({
          quantity: item.qty,
        
          image: baseUrl+item.image,
          price: item.price,
          name: item.name,
        })),
      });
  
      // Redirect to Stripe Checkout
      console.log(response.data.url);
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error initiating checkout:', error);
      // Handle error
    } finally {
      setLoading(false);
    }*/
     
  };

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.label);
  };

  return (
    <div className="shipping">
      <ProcessHeader />
      <CheckoutSteps step1 step2 />
      <div className="form-wrapper">
        <div className="form-container">
          <h2>Where to deliver?</h2>
          <form onSubmit={submitHandler}>
            <h5>
              Address <span style={{ color: 'red' }}>*</span>
            </h5>
            <input required value={address} onChange={(e) => setAddress(e.target.value)} type="text" />
            <h5>
              City <span style={{ color: 'red' }}>*</span>
            </h5>
            <input required value={city} onChange={(e) => setCity(e.target.value)} type="text" />
            <h5>
              Postal code <span style={{ color: 'red' }}>*</span>
            </h5>
            <input required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} type="text" />
            <h5>
              Country <span style={{ color: 'red' }}>*</span>
            </h5>
            <Select required options={countryOptions} onChange={handleCountryChange}
             placeholder="Select a country" />
            <button disabled={loading} type="submit" className="btn-shipping">
              {loading ? 'submitting' : 'submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
