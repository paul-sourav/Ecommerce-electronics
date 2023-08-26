import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/CategoryNav.css";
import { useDispatch } from "react-redux";
import { searchCategory } from "../../app/categorySlice";

const CategoryNav = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/product/get-category"
    );
    setCategory(data);
  };

  useEffect(() => {
    fetchCategory();
  },[]);

  const onClickHandler = (category) => {
    dispatch(searchCategory(category));
  };

  console.log(category)

  return (
    <div className="category-nav">
      <div className="carousel" onClick={() => onClickHandler("")}>
        All
      </div>

      {category.map((item, key) => (
        <div
          className="carousel"
          key={key}
          onClick={() => {
            onClickHandler(item.name);
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryNav;
