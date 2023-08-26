import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import "./style/Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../../app/CartSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate} from "react-router-dom";


const Cart = () => {
  const auth = JSON.parse(localStorage.getItem("user_quickcart"));
  const [quantity, setQuantity] = useState(false);

  /*   const { data } = useSelector((state) => state.Products);

  const filterProduct = data.filter((item) =>
    cartData.find((product) => product.id === item._id)
  ); */
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.Cart);
  const { data, status } = selector;
  const [updateCart, setUpdateCart] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const  navigate = useNavigate();



  useEffect(() => {
    dispatch(fetchCartData(auth));
  },[updateCart, deleteState]);

  let totalAmount = 0;
  data?.map((item) => (totalAmount = totalAmount + item.quantity * item.price));

  const changeQuantityHandler = async (e, pId) => {
    const quantity = e.target.value;
    const { data } = await axios.put(
      `http://localhost:5000/api/user/update-cart/${auth._id}`,
      { pId, quantity },
      {
        headers: { authorization: `Bearer ${auth.token}` },
      }
    );
    console.log(data.result);
    if (data.result) {
      setUpdateCart(!updateCart);
      console.log("update sucessful");
    } else {
      console.log("something went Wrong");
    }
  };

  const cartDeleteHandler = async (pId) => {
    const { data } = await axios.put(
      `http://localhost:5000/api/user/delete-cart/${auth._id}`,
      { pId },
      {
        headers: { authorization: `Bearer ${auth.token}` },
      }
    );
    if (data.result) {
      setDeleteState(!deleteState);
    } else {
      console.log("something went wrong");
    }
  };

  const navigateToCheckout =  () =>{
    const  cartAlldata = {totalAmount,data}
    navigate("/checkout",{state:{cartData:cartAlldata}})
  }

  return (
    <Layout>
      <div className="cart">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Color</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, key) => (
              <tr key={key + Date.now()} className="description">
                <td>
                  <img
                    src={`http://localhost:5000/api/product/product-photo/${item.id}`}
                    width={"100px"}
                  />
                  <h5>{item.name}</h5>
                </td>
                <td>{item.color}</td>
                <td>
                  <select
                    onChange={(e) => {
                      setQuantity(!quantity);
                      changeQuantityHandler(e, item.id);
                    }}
                  >
                    <option selected={item.quantity === 1} value={1}>
                      1
                    </option>
                    <option selected={item.quantity === 2} value={2}>
                      2
                    </option>
                    <option selected={item.quantity === 3} value={3}>
                      3
                    </option>
                  </select>
                </td>
                <td>{item.price}$</td>
                <td>{item.quantity * item.price}$</td>
                <td>
                  <button onClick={() => cartDeleteHandler(item.id)}>
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="summery">
          <h3>price details</h3>
          <div className="price">
            <p>price({data.length})</p> <span>{totalAmount}</span>
          </div>
          <div className="price">
            <p>Delivery Charges</p> <span>Free</span>
          </div>
          <div className="price orderBtn">
            <h2>{totalAmount}$</h2>
            <button onClick={navigateToCheckout}>Place Order</button>      
          </div>
        </div>
      </div> 
    </Layout>
  );
};

export default Cart;
