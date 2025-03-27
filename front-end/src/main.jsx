import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminLogIn from './Components/Admin/AdminLogIn';
import AdminSignUp from './Components/Admin/AdminSignUp';
import UserDetails from "./Components/Admin/UserDetails";
import UserDashboard from './Components/User/UserDashboard';
import UserLogIn from './Components/User/UserLogIn';
import UserSignUp from './Components/User/UserSignUp';
import "./index.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/user" >
        <Route path="/user/login" element={<UserLogIn />} />
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
      </Route>
      <Route path="/admin" >
        <Route path="/admin/login" element={<AdminLogIn />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/DetailedView" element={<UserDetails />} />
      </Route>
    </Routes>
  </BrowserRouter>
);