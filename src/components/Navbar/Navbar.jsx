import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/logo.png";
import "./Navbar.css";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleCreateSupplier = () => {
    navigate("/fetchsupplier");
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  // const userinfo = () => {
  //   navigate("/fetchInfo");
  // };

  const reporting = () => {
    window.location.href = "https://reporting.acutusai.com/";
  };
  const acuadmin = () => {
    window.location.href = "https://acuadmin.acutusai.com/";
  };
  const dashboard = () => {
    window.location.href = "https://dashbaord.qmapi.com/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src={img} alt="Logo" />
        </a>
        <div className="navbar-buttons">
          <button
            type="button"
            className="navbar-button"
            onClick={() =>
              (window.location.href = "https://createsurvey.qmapi.com/")
            }
          >
            Create Survey
          </button>

          <button
            type="button"
            className="navbar-button"
            onClick={handleCreateSupplier}
          >
            Supplier
          </button>
          <button type="button" className="navbar-button" onClick={dashboard}>
            SupplierDashboard
          </button>
          <button type="button" className="navbar-button" onClick={reporting}>
            Reporting
          </button>
          <button type="button" className="navbar-button" onClick={acuadmin}>
            Acuadmin
          </button>
          <button
            type="button"
            className="navbar-button logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
          {/* <button type="button" className="navbar-button" onClick={userinfo}>
            UserInfo
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
