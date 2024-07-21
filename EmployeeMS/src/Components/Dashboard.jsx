import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const anvigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid")
        anvigate('/')
      }
    })
  }
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            
            <div className="d-flex justify-content-center align-items-center p-2 mb-md-1 mt-md-3" style={{ height: '100px' }}>
                <Link to="/dashboard" className="text-white text-decoration-none w-100">
                    <span className="fs-5 fw-bolder d-none d-sm-inline">NAPREDNE TEHNIKE INTERNET PROGRAMIRANJA</span>
                </Link>
            </div>
            <hr className="text-white text-decoration-none w-100"></hr>
            
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="w-100">
                <Link to="/dashboard" className="nav-link text-white px-0 align-middle">
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Početna</span>
                </Link>
              </li>

              <li className="w-100">
                <Link to="/dashboard/employee" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline"> Zaposlenici </span>
                </Link>
              </li>

              <li className="w-100">
                <Link to="/dashboard/category" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline"> Kategorije </span>
                </Link>
              </li>

              <li className="w-100">
                <Link to="/dashboard/info" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Informacije</span>
                </Link>
              </li>

              <li className="w-100" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Odjavi se</span>
                </Link>
              </li>

            </ul>
          </div>
        </div>
        <div className="col p-2 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>Sistem za praćenje zaposlenika</h4>
            </div>
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;