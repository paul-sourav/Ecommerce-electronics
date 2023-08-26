import React, { useEffect, useState } from "react";
import axios from "axios";

const AddressCom = ({ data }) => {
  const auth = JSON.parse(localStorage.getItem("user_quickcart"));
  const [userAddress, setUserAddress] = useState([]);
  useEffect(() => {
    fetchUserAddress();
  }, []);

  const fetchUserAddress = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/user/user-address/${auth._id}`,
      {
        headers: { authorization: `Bearer ${auth.token}` },
      }
    );
    if (data) {
      console.log(data);
      setUserAddress(data);
    } else {
      console.log("no data found");
    }
  };

  return (
    <div className="address-summery">
      <div>
        <p>Pincode:-{data?.Pincode}</p>
        <p>Name:-{data?.Name}</p>
        <p>Block:-{data?.Block}</p>
        <p>Division:-{data?.Division}</p>
        <p>State:-{data?.State}</p>
      </div>

      {userAddress.address?.map((item, key) => (
        <div key={key} style={{ marginTop: "1.2rem" }}>
          <p>Name:-{item.username}</p>
          <p>Street:-{item.streetname}</p>
          <p>landMark:-{item.landmark}</p>
          <p>Pincode:-{item.pincode}</p>
          <p>Area:-{item.name}</p>
          <p>Block:-{item.block}</p>
          <p>Division:-{item.district}</p>
          <p>State:-{item.state}</p>
          <button>Delete</button>
          <button>select</button>
        </div>
      ))}
    </div>
  );
};

export default AddressCom;
