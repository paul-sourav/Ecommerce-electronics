import React, {useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../admin/style/adminpage.css";
import Layout from "../../components/Layout/Layout";
import CategoryNav from "../../components/Layout/CategoryNav";
import { BsBalloonHeart } from "react-icons/bs";
import axios from "axios";
import "./style/ProductPage.css";
import { toast } from "react-toastify";

const ProductPage = () => {
  const { data, status } = useSelector((state) => state.Products);
  const { categoryName } = useSelector((state) => state.SeachCategory);
  const [searchProduct, setSearchProduct] = useState("");
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("user_quickcart"));

  //Add wishlist in db
  const wishlistHandler = async (wishlist) => {
    const { data } = await axios.put(
      `http://localhost:5000/api/user/add-wishlist/${auth._id}`,
      { wishlist },
      {
        headers: { authorization: `Bearer ${auth.token}` },
      }
    );
    if (data.message) {
      toast.warn("please login first");
      navigate("/login");
    }
    if (data.result) {
      toast.success("added to your wishlist");
    } else {
      toast.warn("Already in your wishlist");
    }
  };

 console.log(categoryName)

  return (
    <Layout>
      <CategoryNav />
      <div className="search_product">
        <input
          type="text"
          placeholder="search Product"
          onChange={(e) => setSearchProduct(e.target.value)}
        />
      </div>

      <div className="box4">
        {data
          .filter((item) => {
            if (searchProduct.length === 0) {
              return item;
            } else {
              return item.name
                .toLowerCase()
                .includes(searchProduct.toLowerCase());
            }
          })
          .filter((item) => {
            if (categoryName === "") {
              return item;
            } else {
              return categoryName === item.category.name;
            }
          })
          .map((item, key) => (
            <div key={key} className="main">
              <img
                src={`http://localhost:5000/api/product/product-photo/${item._id}`}
                onClick={() => navigate(`/productCom/${item.slug}`)}
              />
              <h4 className="td">{item.name}</h4>
              <p className="td">{item.price}$</p>
              <p className="td">{item.category.name}</p>
              <div className="btn">
                <button onClick={() => wishlistHandler(item._id)}>
                  Wishlist <BsBalloonHeart />
                </button>
              </div>
            </div>
          ))}
      </div>

    </Layout>
  );
};

export default ProductPage;
