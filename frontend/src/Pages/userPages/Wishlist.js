import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import  {AiOutlineDelete} from "react-icons/ai"
import { toast } from 'react-toastify';

const Wishlist = () => {
  const auth = JSON.parse(localStorage.getItem("user_quickcart"));
  const [wishlist,setWishlist] = useState([]);
  const [delState,setDelState] = useState(false);

  const navigate = useNavigate()
  useEffect(()=>{
    fetchWishlist()
  },[delState]);

  const fetchWishlist = async() =>{
    const {data} = await axios.get(`http://localhost:5000/api/user/find-wishlist/${auth._id}`) 
    if(data.wishlist){
        setWishlist(data.wishlist);
    }else{
        console.log("no data found ")
    }
  }

  const removeWishlistHandler = async(wishlist) =>{
    const {data} = await  axios.put(`http://localhost:5000/api/user/delete-wishlist/${auth._id}`,{wishlist},{
        headers:{"authorization":`Bearer ${auth.token}`}
       });
    console.log(data)
    if(data.message){
        console.log(data)
        toast.warn("please login first")
        navigate("/login")
       }
       if(data.result){
        setDelState(!delState)
        toast.success("removed from your wishlist")
       }
       else{
        toast.warn('Already in your wishlist')
       }
  }

  return (
   <Layout>
     <div style={{textAlign:"center"}}>
        <h3>Wishlist</h3>
     </div>
     <div className='box4'>
      {
        wishlist.map((item, key) => (
            <div key={key} className="main">
              <img
                src={`http://localhost:5000/api/product/product-photo/${item._id}`}
                onClick={() => navigate(`/productCom/${item.slug}`)}
              />
              <h4 className="td">{item.name}</h4>
              <p className="td">{item.price}$</p>
              <p className="td">{item.category.name}</p>
                <div className='btn'>
                    <button onClick={()=>removeWishlistHandler(item._id)}><AiOutlineDelete/>wishlist</button>
                    {/* <button>add to cart</button> */}
                </div>
            </div>
          ))
      }
    </div>
   </Layout>
  )
}

export default Wishlist
