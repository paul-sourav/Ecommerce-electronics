import React, { useEffect } from 'react';
import "./style/checkout.css";
import {useLocation, useNavigate} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
const CheckOut = () => {

 const location = useLocation();
 const navigate = useNavigate();
 const cataData = location.state ? location.state.cartData: [];
  console.log(cataData);
  
 

  return (
   <Layout>
     <div className='checkout-page'>
      Checkout
    </div>
   </Layout>
  )
}

export default CheckOut
