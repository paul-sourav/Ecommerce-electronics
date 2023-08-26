import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { fetchProduct } from "../../app/productSlice";
import { fetchCartData } from "../../app/CartSlice";


const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem("user_quickcart"));
  useEffect(()=>{
    dispatch(fetchProduct());
    dispatch(fetchCartData(auth))
  },[])

  return (
    <div style={{position:"relative",minHeight:"100vh"}}>
      <Header />
      <main>
        {children}
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
