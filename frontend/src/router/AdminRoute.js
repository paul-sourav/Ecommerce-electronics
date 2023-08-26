import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Error from './Error';
import axios from "axios"

const AdminRoute =() => {
  const auth = JSON.parse(localStorage.getItem("user_quickcart"));
  const backend_url = process.env.REACT_APP_BACKEND_URI;
  const [authUser,setAuthuser] = useState(false);
    if(auth){
        axios.get(`${backend_url}/auth_admin`,{
            headers:{"authorization":`Bearer ${auth.token}`}
        }).then(({data}) => {
            data.ok ? setAuthuser(true) : setAuthuser(false)
        }).catch((err) => {
            console.log(err)
        });
    }else{
        console.log("something went wrong")
    }
  return (
    authUser ? <Outlet/> : <Error/>
  )
}

export default AdminRoute
