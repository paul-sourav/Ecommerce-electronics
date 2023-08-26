import React from "react";
import { NavLink } from "react-router-dom";
import "./style/adminpage.css";

const AdminMenu = () => {
  return (
    <div className="admin-menu">
      <nav>
        <NavLink to={"/dashboard/create-category"}  className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "activemenu" : ""
            }>
          Create-Category
        </NavLink>

        <NavLink to={"/dashboard/create-product"} className={({isActive,isPending})=>
            isPending? "pending" : isActive? "activemenu" : ""   
        }>
          Create-Product
        </NavLink>

        <NavLink to={"/dashborad/user"} className={({isActive,isPending})=>
            isPending? "pending" : isActive? "activemenu" : ""   
        }>
         User
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminMenu;
