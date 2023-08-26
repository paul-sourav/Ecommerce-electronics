import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Error.css";

const Error = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="Error">
      <h1>please login first </h1>
      <button onClick={() => navigate("/login",{state:location.pathname})}>
        login first
      </button>
    </div>
  );
};

export default Error;
