import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import "./ProductCom.css";
import { useDispatch} from 'react-redux';
import { fetchCartData } from '../../app/CartSlice';


const ProductCom = () => {
const [product,setProduct]=useState([]);
const [quantity,setQuantity] = useState(1);
const params =  useParams();
const auth = JSON.parse(localStorage.getItem("user_quickcart"));
const  [cartState,setCartState] = useState(false)
const dispatch  = useDispatch();

useEffect(()=>{
  fetchProduct()
  dispatch(fetchCartData(auth))
},[cartState])

const fetchProduct = async()=>{
    const {data} =  await axios.get(`http://localhost:5000/api/product/single-product/${params.id}`);
    if(data.product){
        setProduct(new Array(data.product));
    }else{
        console.log('error occurred')
    }
}

const cartSubmitHandler = async(id,price,name) =>{
    const cartItem = {_id:id,name:name,quantity:quantity,color:"not-defined",price:price};
    const {data}  = await axios.post(`http://localhost:5000/api/user/add-cart/${auth._id}`,{cartItem},{
        headers:{"authorization":`Bearer ${auth.token}`}
    });
    console.log(data)
    if(data.result){
        console.log("added to the cart")
        setCartState(!cartState)
    }else{
        alert(data.message)
    }
    
}

  return (
    <Layout>
        <div>
            {
            product.map((product,index) => (
            <div key={index} className="single_product">
            <img src={`http://localhost:5000/api/product/product-photo/${product._id}`} alt='product-image'/>
                <div className="single-product-text">
                <h3>{product.name}</h3>
                <h2>{product.price}$</h2>
                <h5>category : {product.category.name}</h5>
                <p>{product.description}</p>

                <label htmlFor='quan'>Quan</label>
                <select id='quan' onChange={(e)=> setQuantity(e.target.value)}>
                    <option selected value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>

                <button className="single-product-btn" >Buy now</button>
                <button className="single-product-btn" onClick={()=>cartSubmitHandler(product._id,product.price,product.name)} >Add to Cart</button>
                </div>
            </div>
        )) 
            }
        </div>
    </Layout>
  )
}

export default ProductCom
