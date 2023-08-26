import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import "./style/Address.css";
import AddressCom from "../../components/productCom/AddressCom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const [pin, setPin] = useState("");
  const [allPin, setAllpin] = useState([]);
  const [userPin, setUserPin] = useState([]);
  const [street, setStreet] = useState("");
  const [landmark, setLandmaark] = useState("");
  const [name,setName] =useState("");
  const auth =  JSON.parse(localStorage.getItem("user_quickcart"));
  const navigate =  useNavigate();

  const fetchpin = async () => {
    const { data } = await axios.get(
      `https://api.postalpincode.in/pincode/${pin}`
    );
    setAllpin(data[0].PostOffice);
  };

  useEffect(() => {
    if (pin.length == 6) {
      fetchpin();
    }
  }, [pin]);

  const data = allPin?.find((item) => {
    return item.Name === userPin;
  });

  const submitHandler = async()=>{
     let address = {
      uid:auth._id,
      username:name,
      name : data.Name,
      pincode :data.Pincode,
      block:data.Block,
      district:data.Division,
      state:data.State,
      streetname:street,
      landmark:landmark
     }
     try {
      const {data} = await axios.post(`http://localhost:5000/api/address/add-address`,{address},
      {
        headers: { authorization: `Bearer ${auth.token}`},
      }
     )
     if(data.result){
      console.log(data)
      setTimeout(()=>toast.success("Address saved ✅"),500)
      navigate("/dashboard/user")
     }
     } catch (error) {
      console.log(error)
     }
     
  }


  return (
    <Layout>
      <div className="address">
      <div className="pin">
      <h2>Enter Your Address</h2>
      <form onSubmit={(e)=>{
            e.preventDefault();
            submitHandler()
        }}>
        <div>
          <label>Name</label>
          <input type="text" placeholder="enter your name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="pincode">Pincode</label>
          <input
            type="number"
            placeholder="110001"
            onChange={(e) => setPin(e.target.value)}
            name="pincode"
          />
        </div>
        <div>
        <select
          className="address-pincode"
          onChange={(e) => setUserPin(e.target.value)}
        >
          <option value="" selected>
            --Please choose an option--
          </option>
          {allPin?.map((item, key) => (
            <option key={key} value={item.Name}>
              {item.Name}
            </option>
          ))}
        </select>
        </div>
        <div>
          <label>Street:-</label>
          <input
            type="text"
            placeholder="Enter your steet "
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div>
          <label>landMark:-</label>
          <input
            type="text"
            placeholder="Enter your Landmark"
            value={landmark}
            onChange={(e) => setLandmaark(e.target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
      </div>
      {data?<AddressCom data={data} />:null}
      </div>
    </Layout>
  );
};

export default Address;
