import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import "./style/adminpage.css";
import CategoryTable from "../../components/adminCom/CategoryTable";
import axios from "axios";
import { toast } from "react-toastify";

const CreateCategory = () => {
    const auth  =  JSON.parse(localStorage.getItem("user_quickcart"));
    const [name,setName] = useState("");
    const [updateState,setUpdateState] = useState(false);

    const submitHandler = async (e)=>{
        e.preventDefault();        
        // e.preventDefault();
        if(auth){
            const {data} =await axios.post("http://localhost:5000/api/product/category",{name},{
                headers:{"authorization":`Bearer ${auth.token}`}
            });
            if(data.name){
                 toast.success("Saved Successful")
                 setUpdateState(!updateState);
            }else{
                toast.warn("somethig went wrong")
            }
        }
    }

  return (
    <Layout>
      <div className="container">
        <AdminMenu />
        <div className="category">
            <form onSubmit={(e)=>{ 
                submitHandler(e)
            }}>
                <h2>Create new Category</h2>
                <input id="name" type="text" placeholder="Category Name" onChange={(e)=>{setName(e.target.value)}}/>
                <button type="submit">Submit</button>
            </form>
            <CategoryTable updateState={updateState} />
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
