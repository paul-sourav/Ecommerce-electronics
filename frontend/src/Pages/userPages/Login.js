import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "./style/Signup.css"
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import {IoEyeSharp,IoEyeOff} from 'react-icons/io5';
import { useDispatch } from "react-redux";
import { fetchCartData } from "../../app/CartSlice";


const Login = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false)
  const location = useLocation();
  const dispatch  = useDispatch();


  const backend_url = process.env.REACT_APP_BACKEND_URI;
  const formdata = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitHandler = async () => {
    if(!user.email || !user.password){  
        alert("please fill all the fields")
        return false
    }else{
       try {
        const findUser =  await fetch(`${backend_url}/login`,{
                method:"post",
                body:JSON.stringify(user),
                headers:{"content-type":"application/json"}
        })
        const result = await findUser.json();
        if(result._id){
            navigate(location.state||"/");
            // setTimeout(()=>toast.success("Welcome Back "),1000);
            dispatch(fetchCartData(result))
            localStorage.setItem("user_quickcart",JSON.stringify(result));
        }else{
            toast.warn(result.message)
        }
       } catch (error) {
          console.log(error)
       }
    }
  };
  
  return (
   <Layout>
     <div className="form">
      <div className="bg-image2"></div>
      <form onSubmit={(e)=>{
        e.preventDefault();
        submitHandler()
      }}>
        <h1>Login</h1>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formdata}
            placeholder="Example@mail.com"
          />
        </div>

        <div>
          <label htmlFor="password">Phone</label>
          <input
             type={!showPassword?"text":"password"}
            id="password"
            name="password"
            onChange={formdata}
            placeholder="*********"
          />
          <span onClick={()=>setShowPassword(!showPassword)}>
             {showPassword?<IoEyeSharp/>:<IoEyeOff/>} 
            </span>
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
    </div>
   </Layout>
  );
};

export default Login;
