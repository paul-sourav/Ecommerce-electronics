import React, { useEffect } from "react";
import "../style/Header.css";
import { Link, NavLink } from "react-router-dom";
import {FaCartPlus} from 'react-icons/fa'
import { useSelector } from "react-redux";
import {GrUserExpert} from "react-icons/gr"

const Header = () => {
  const user = JSON?.parse(localStorage?.getItem("user_quickcart"));
  const selector = useSelector((state)=>state.Cart);

  return (
    <div className="navbar">
      <Link
            to={"/"}
          >
           <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>
          </Link>
     
      <nav>
        <ul>
        
        

          {
            !user ?
            <>
            <NavLink
            to={"/signup"}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <li>Signup</li>
          </NavLink>

          <NavLink
            to={"/login"}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <li>Login</li>
          </NavLink>
            </>:
            <>
            <NavLink
            to={`/dashboard/${user?.role ==="admin" ?"admin":"user"}`}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <li><GrUserExpert/></li>
          </NavLink>

          <NavLink
            to={"/dashboard/user/cart"}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <li className="cartitem"><span className="cartBadge">{selector.data?.length}</span><FaCartPlus/></li>
          </NavLink>
            </>
          }


          
          <NavLink
            to={"/product"}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <li>Products</li>
          </NavLink>
            
            
        

        </ul>
      </nav>
    </div>
  );
};

export default Header;
