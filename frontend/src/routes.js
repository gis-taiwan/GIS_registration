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
import Dashboard from "Pages/Dashboard.js";
import Grading from "Pages/Grading.js";
import LoginForm from "Pages/Login";
import InterviewIndex from "Pages/InterviewIndex";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Overview",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/grading",
    name: "Essay Grading",
    icon: "nc-icon nc-chart-pie-35",
    component: Grading,
    layout: "/admin",
  },
  {
    path: "/interview",
    name: "Interview Grading",
    icon: "nc-icon nc-chart-pie-35",
    component: InterviewIndex,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-layers-3",
    component: LoginForm,
    layout: "/admin",
  },  
];

export default dashboardRoutes;
