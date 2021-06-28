/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { setCookie, getCookie, AuthzFuction, deleteCookie } from "../Navbars/CookieUsage";
import { Nav } from "react-bootstrap";

// import logo from "assets/img/reactlogo.png";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a className="simple-text" href="http://localhost:3001">
            GIS Taiwan Registration
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect){
              if(getCookie("username") === "" && prop.name !== "Login"){
                console.log("1");
                return null;
              }else if(getCookie("username") !== "" && AuthzFuction() === 1 && (prop.name === "Grading" || prop.name === "Scheduling" || prop.name === "Login")){
                console.log("2");
                return null;
              }else if(getCookie("username") !== "" && AuthzFuction() === 0 && (prop.name === "Registration Status" || prop.name === "Interview Time" || prop.name === "Login")){
                console.log("3");
                return null;
              }
              
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            }
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
