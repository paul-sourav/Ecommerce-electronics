import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminCom.css";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";

const CategoryTable = ({ updateState }) => {
  const [category, setCategopry] = useState([]);
  const [deletestate, setDeletestate] = useState(false);
  const [updateCatCall, setUpdateCatCall] = useState(false);
  const [updateItems, setUpdateItems] = useState("");
  const [name, setName] = useState("");

  const auth = JSON.parse(localStorage.getItem("user_quickcart"));
  useEffect(() => {
    fetchCategory();
  }, [updateState, deletestate]);

  //get all categories
  const fetchCategory = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/product/get-category"
    );
    setCategopry(data);
  };
  // delete category
  const deleteCategory = async (id) => {
    console.log(id);
    const confirm = window.confirm("Are you sure you want to delete");
    if (auth && confirm) {
      const { data } = await axios.delete(
        `http://localhost:5000/api/product/delete-category/${id}`,
        {
          headers: { authorization: `Bearer ${auth.token}` },
        }
      );
      if (data.name) {
        toast.success("delete sucessful");
        setDeletestate(!deletestate);
      } else {
        toast.warn("something went wrong");
      }
    }
  };
  //update category
  const submitHandler = async (e) => {
    e.preventDefault();
    if (auth) {
      const { data } = await axios.put(
        `http://localhost:5000/api/product/update-category/${updateItems._id}`,
        { name },
        {
          headers: { authorization: `Bearer ${auth.token}` },
        }
      );
      if (data.name) {
        toast.success("update sucessful");
        setDeletestate(!deletestate);
        setUpdateCatCall(false)
      } else {
        toast.warn("something went wrong");
      }
    }
  };

  return (
    <div>
      {/* //list of Category */}
      <table className="category-table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
          {category.map((item, key) => (
            <tr key={key} className="tablemenu">
              <td>{item.name}</td>
              <td>
                <button
                  type="button"
                  className="btn-edit"
                  onClick={() => {
                    setUpdateCatCall(!updateCatCall);
                    setUpdateItems(item);
                  }}
                >
                  <RiEdit2Line />
                </button>
                <button
                  type="button"
                  className="btn-del"
                  onClick={() => deleteCategory(item._id)}
                >
                  <RiDeleteBin6Line />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* //update component */}
      {updateCatCall ? (
        <div className="update-compo">
          <span className="cross" onClick={() => setUpdateCatCall(false)}>
            <ImCross />
          </span>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h2>Update Category</h2>
            <input
              id="name"
              type="text"
              placeholder={updateItems.name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default CategoryTable;
