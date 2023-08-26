import React, { useEffect, useState } from 'react'
import Layout from "../../components/Layout/Layout";
import { fetchCartData } from '../../app/CartSlice';
import "./style/Dashboard.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GiBoxUnpacking } from "react-icons/gi";
import { TfiHeart } from 'react-icons/tfi';
import { BsPinMapFill } from "react-icons/bs";
import { RiUser6Fill } from 'react-icons/ri';
import { GrLogout } from "react-icons/gr";
import {MdDelete} from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const auth = JSON.parse(localStorage.getItem("user_quickcart"));
  const [showAddress, setShowAddress] = useState(false);
  const [updateState,setUpdatestate] = useState(false);
  useEffect(() => { fetchUser() }, [updateState])

  const logoutHandler = () => {
    localStorage.clear("user_quickcart");
    const user = [];
    dispatch(fetchCartData(user))
    navigate("/login")
  }
  const fetchUser = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/user/user_profile/${auth._id}`,
      {
        headers: { "authorization": `Bearer ${auth.token}` }
      });
    if (data.name) {
      setUser(data)
    } else {
      console.log(data.message)
    }
  }

  const deleteAddressHandler = async(aid)=>{
    const {data} =  await axios.delete(`http://localhost:5000/api/address/delete-address/${aid}`);
    console.log(data);
    if(data.name){
      toast.error("Address Deleted")
      setUpdatestate(!updateState);
    }
  }

  return (
    <Layout>
      <div className='dashboard'>
        <div className='dashboard-btn'>
          <h2>Hey {user.name} </h2>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <button onClick={() => navigate("/dashboard/user/wishlist")}><span><TfiHeart /></span> Wishlist </button>
          <button onClick={() => setShowAddress(!showAddress)}><span><BsPinMapFill /></span>Saved address</button>
          <button><span><GiBoxUnpacking /></span>orders</button>
          <button onClick={() => logoutHandler()}><span><GrLogout /></span>Logout</button>
          <button><span><RiUser6Fill /></span>Edit Profile</button>
        </div>
        <div className='dashboard-item'>
          {showAddress ?
           <>
           {user.address.map((item, key) => (
             <div key={key} className='saved-address'>
                <p>Name:-{item.username}</p>
                <p>Street:-{item.streetname}</p>
                <p>landMark:-{item.landmark}</p>
                <p>Pincode:-{item.pincode}</p>
                <p>Area:-{item.name}</p>
                <p>Block:-{item.block}</p>
                <p>Division:-{item.district}</p>
                <p>State:-{item.state}</p>
                <button onClick={()=>{deleteAddressHandler(item._id)}}><MdDelete/></button>
                <button>Edit</button>
              </div>
            ))}
            <button onClick={()=>navigate("/address")} className='new-address' >new Address</button>
           </>
          :
          null
          }

        </div>
      </div>
    </Layout>
  )
}

export default Dashboard



