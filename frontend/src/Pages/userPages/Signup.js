import React, { useEffect, useState } from 'react';
import "./style/Signup.css";
import {useNavigate} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
import {IoEyeSharp,IoEyeOff} from 'react-icons/io5';

const Signup = () => {
    const [user,setUser] = useState({});
    const auth = localStorage.getItem("user");
    const navigate  = useNavigate()
    const backend_url = process.env.REACT_APP_BACKEND_URI;
    const [showPassword,setShowPassword] = useState(false)
/*     useEffect(()=>{
      if(auth){
        navigate("/products")
      }
    },[]) */
  
    const formdata  = (e)=>{
      setUser({...user,[e.target.name]:e.target.value})
    } 
    const submitHandler = async ()=>{
      try {
          const fetchdata = await fetch(`${backend_url}/register`,{
              method:"Post",
              body:JSON.stringify(user),
              headers:{"content-type":"application/json"}
          })
          const {result}  = await fetchdata.json();
          if(result){
              setTimeout(()=>toast.success("register sucessful"),1000)
              navigate("/login");
          }else{
              toast.warning("something error")
          }
      } catch (error) {
          console.log(error)
      }
    } 
    return (
    <Layout>
      <div className="form">
       <div className="bg-image"></div>
        <form onSubmit={(e)=>{
            e.preventDefault();
            submitHandler()
        }}>
        <h1>Signup</h1>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={formdata} placeholder="Enter Your Name" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={formdata} placeholder="Example@mail.com" />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input type="Number" id="phone" name="phone" onChange={formdata} placeholder="+91111111111" />
          </div>
    
          <div>
          <label htmlFor="password">Password</label>
            <input type={!showPassword?"text":"password"} id="password" name="password" onChange={formdata} placeholder="*********" />
            <span onClick={()=>setShowPassword(!showPassword)}>
             {showPassword?<IoEyeSharp/>:<IoEyeOff/>} 
            </span>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
      </Layout>
    );
}

export default Signup
