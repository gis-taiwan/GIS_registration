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
import UserProfile from "Pages/UserProfile.js";
import Status from "Pages/Status.js";
import Timetable from "Pages/Timetable.js";
import Grading from "Pages/Grading.js";
import Scheduling from "Pages/Scheduling.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Overview",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/account",
    name: "My account",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/status",
    name: "Registration Status",
    icon: "nc-icon nc-bell-55",
    component: Status,
    layout: "/admin",
  },
  {
    path: "/timetable",
    name: "Availaibe Time",
    icon: "nc-icon nc-compass-05",
    component: Timetable,
    layout: "/admin",
  },
  {
    path: "/grading",
    name: "Grading",
    icon: "nc-icon nc-chart-pie-35",
    component: Grading,
    layout: "/admin",
  },
  {
    path: "/scheduling",
    name: "Scheduling",
    icon: "nc-icon nc-layers-3",
    component: Scheduling,
    layout: "/admin",
  },
];

export default dashboardRoutes;
