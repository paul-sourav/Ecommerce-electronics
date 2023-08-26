import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from './AdminMenu'
import "./style/CreateProduct.css";
import { toast } from 'react-toastify';
import axios, { all } from "axios";


const CreateProduct = () => {
  const [allCategory,setAllCategory] = useState([])

   useEffect(()=>{fetchCategory()},[])
   const fetchCategory = async()=>{
     const {data} = await axios.get("http://localhost:5000/api/product/get-category");
     if(data){setAllCategory(data)}
     else{console.log("no categroy found")}
   }
  const[name,setName]=useState("");
  const[description,setDescription] =useState("");
  const[price,setPrice] = useState("");
  const[quantity,setQuantity]=useState("");
  const[category,setCategory]=useState("");
  const[photo,setPhoto]=useState("");
  
  const formdata = new FormData();
  formdata.append("name",name);
  formdata.append("description",description);
  formdata.append("price",price);
  formdata.append("quantity",quantity);
  formdata.append("category",category);
  formdata.append("photo",photo);

  const auth = JSON.parse(localStorage.getItem("user_quickcart"));
 const SubmitHandler = async(e)=>{
    e.preventDefault();
    
    const newProduct  = await axios.post("http://localhost:5000/api/product/set-product",formdata,{
      headers:{"authorization":`Bearer ${auth.token}`}
    })
    if(newProduct.data.product){
      console.log(newProduct);
      toast.dark("products has been saved in our database!")
    }else{
      console.log(newProduct);
      toast.error(newProduct)
    }
  }

  return (
    <Layout>
      <div className='container'>
        <AdminMenu/>
        <div className='box1'>
            <div className='create-product-box'>
              <h2>Create Product</h2>
                <form onSubmit={SubmitHandler}>
                  <div>
                    <label htmlFor='name1'>Name</label>
                    <input type="text" id='name1' onChange={(e)=>setName(e.target.value)} placeholder='enter product name'/>
                  </div>
                  <div>
                    <label htmlFor='description1'>Description</label>
                    <input type="text" id='description1' onChange={(e)=>setDescription(e.target.value)} placeholder='product description'/>
                  </div>
                  <div>
                    <label htmlFor='price1'>Price</label>
                    <input type="number" id='price1' onChange={(e)=>setPrice(e.target.value)} placeholder='product price'/>
                  </div>
                  <div>
                    <label htmlFor='quantity1'>Quantity</label>
                    <input type="number" id='quantity1' onChange={(e)=>setQuantity(e.target.value)} placeholder='product quantity'/>
                  </div>
                  <div>
                    <label htmlFor='category1'>Category</label>
                    <select name='category' id='category1' autoFocus  onChange={(e)=>setCategory(e.target.value)}>
                       <option value="">please choose category</option>
                    {allCategory.map((item,key)=>(
                        <option key={key} value={item._id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor='photo1'>Photo</label>
                    <input type='file' id='photo1' onChange={(e)=>setPhoto(e.target.files[0])} placeholder='product photo'/>
                  </div>
                  <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
