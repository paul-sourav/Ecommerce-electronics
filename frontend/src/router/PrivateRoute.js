import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Error from './Error';
import axios from "axios"



const PrivateRoute =() => {
    
  const auth = JSON.parse(localStorage.getItem("user_quickcart"));
  const backend_url = process.env.REACT_APP_BACKEND_URI;
  const [authUser,setAuthuser] = useState("");

    if(auth){
        axios.get(`${backend_url}/auth_user`,{
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

export default PrivateRoute
