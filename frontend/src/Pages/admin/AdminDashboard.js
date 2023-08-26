import React, { useEffect, useState } from "react";
import "./style/adminpage.css";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { imagefrombuffer } from "imagefrombuffer";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchCate, setSearchCate] = useState("");
  const  navigate  = useNavigate()


  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const products = await axios.get("http://localhost:5000/api/product/get-product");
    if (products.data) {
      setProducts(products.data);
    } else {
      toast.black("something went wrong")
    }
  }

  const deleteHandler = async (pid) => {
     const confirm = window.confirm("Are you sure you want to delete this product")
     if(confirm){
      try {
        const {data}= await axios.delete(`http://localhost:5000/api/product/delete-product/${pid}`)
        if(data.product){
          console.log(data)
          toast.success("delete sucessful")
          navigate("/dashboard/admin")
        }
      } catch (error) {
        console.log(error)
        toast.error(error)
      }
     }
  }

  return (
    <Layout>
      <div className="container">
        <AdminMenu />
        <div className="box2">
          <div className="box3">
            <h2>Admin page</h2>
            <form>
              <input type="text" onChange={(e) => setSearchProduct(e.target.value)} placeholder="search-product" />
            </form>
          </div>
          <div className="box4">
            {
              products.filter((item) => {
                if (searchProduct.length === 0) {
                  return item
                } else {
                  return item.slug.toLowerCase().includes(searchProduct.toLowerCase())
                }
              })
                .map((item,key) => (
                  <div key={key} className="main">
                    <div style={{width:"100%"}}>
                    <img src={`http://localhost:5000/api/product/product-photo/${item._id}`} onClick={()=>navigate(`/productCom/${item.slug}`)}/>
                    </div>
                    <h4 className="td">{item.name}</h4>
                    <p className="td">{item.price}$</p>
                    <p  className="td">{item.category.name}</p>
                    <div className="btn">
                      <button style={{borderRadius:"0 0 0 0.8rem"}} onClick={()=>navigate(`/productupdate/${item.slug}`)}><RiEdit2Line /></button>
                      <button style={{borderRadius:"0 0 0.8rem 0"}} onClick={()=>deleteHandler(item._id)} ><RiDeleteBin6Line /></button>
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
