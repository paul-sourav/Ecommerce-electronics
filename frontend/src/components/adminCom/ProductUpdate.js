import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../Layout/Layout';
import { toast } from 'react-toastify';

const ProductUpdate = () => {
    const [product,setProduct] = useState({})
    const navigate = useNavigate()
    useEffect(()=>{
        fetchProduct()
        fetchCategory()
      },[])
      
      const fetchProduct = async()=>{
        const {data} =  await axios.get(`http://localhost:5000/api/product/single-product/${params.slug}`);
        if(data.product){
            setProduct(data.product);
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setCategory(data.product.category._id)
        }else{
            console.log('error occurred')
        }
    }

    const fetchCategory = async()=>{
      const {data} = await axios.get("http://localhost:5000/api/product/get-category");
      if(data){setAllCategory(data)}
      else{console.log("no category found")
  }}


    const params  = useParams(); 
    const[name,setName]=useState('');
    const[description,setDescription] =useState("");
    const[price,setPrice] = useState("");
    const[quantity,setQuantity]=useState("");
    const[category,setCategory]=useState("");
    const[photo,setPhoto]=useState("");
    const [allCategory,setAllCategory] = useState([]);
    
    const formData = new FormData();
    formData.append("name",name);
    formData.append("description",description);
    formData.append("price",price);
    formData.append("quantity",quantity);
    formData.append("category",category);
    formData.append("photo",photo)

    const auth = JSON.parse(localStorage.getItem("user_quickcart"));
    const SubmitHandler = async(e)=>{
      e.preventDefault();
    
      const newProduct  = await axios.put(`http://localhost:5000/api/product/update-product/${product._id}`,formData,{
        headers:{"authorization":`Bearer ${auth.token}`}
      })
      if(newProduct.data.success){
        console.log(newProduct);
        navigate("/dashboard/admin")
        toast.dark("products has been saved in our database!")
      }else{
        console.log(newProduct);
        toast.error(newProduct)
      }
    }

  return (
    <Layout>
      <div className='container'>
        <div className='box1'>
            <div className='create-product-box'>
              <h2>Update Product</h2>
                <form onSubmit={SubmitHandler}>
                  <div>
                    <label htmlFor='name1'>Name</label>
                    <input type="text" id='name1' value={name}  onChange={(e)=>setName(e.target.value)} placeholder='enter product name'/>
                  </div>
                  <div>
                    <label htmlFor='description1'>Description</label>
                    <input type="text" id='description1' value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='product description'/>
                  </div>
                  <div>
                    <label htmlFor='price1'>Price</label>
                    <input type="number" id='price1' value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='product price'/>
                  </div>
                  <div>
                    <label htmlFor='quantity1'>Quantity</label>
                    <input type="number" id='quantity1' value={quantity} onChange={(e)=>setQuantity(e.target.value)} placeholder='product quantity'/>
                  </div>
                  <div>
                    <label htmlFor='category1'>Category</label>
                    <select name='category' id='category1' onChange={(e)=>setCategory(e.target.value)}>
                      {allCategory.map((item,key)=>(
                        <option key={key} value={item._id} selected={category == item._id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor='photo1'>Photo</label>
                    <input type='file' id='photo1' onChange={(e)=>setPhoto(e.target.files[0])}/>
                  </div>
                  <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductUpdate
