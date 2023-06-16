

import { Routes, Route ,useLocation } from "react-router-dom";
import React from "react";
import "./App.scss";

import AD_home from "./Component/FE_admin/AD_component/AD_home";
import AD_show from "./Component/FE_admin/AD_component/AD_show";
// FE-User
import Homepage from "./Component/FE_user/Layout/Page/Home/Homepage";
import NobelPrizes from "./Component/FE_user/Layout/Page/NobelPrizes/NobelPrizes";
import AlfredNobel from "./Component/FE_user/Layout/Page/AlfredNobel/AlfredNobel";
import WillAlfedNobel from "./Component/FE_user/Layout/Page/WillAlfedNobel/WillAlfedNobel";
import Navbar from "./Component/FE_user/Layout/Navbar";
import Footer from "./Component/FE_user/Layout/Footer";
import ScollToTop from "./Component/FE_user/Layout/ScrollToTop";

function App() {
  const location = useLocation();
  
  return (
    <>
      {/* Admin */}
      <Routes>
        <Route path="/admin" element={<AD_home />} />
        <Route path="/admin/show" element={<AD_show />} />

      </Routes>

      {/* User */}
      {location.pathname ==="/nobel-prizes" || location.pathname === "/alfred-nobel/nobel-will"  || location.pathname === "/"  || location.pathname==='/alfred-nobel' ? <Navbar /> : null}
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/nobel-prizes" element={<NobelPrizes />} />
        <Route path="/alfred-nobel" element={<AlfredNobel />} />
        <Route path="/alfred-nobel/nobel-will" element={<WillAlfedNobel />} />
      </Routes>
      <ScollToTop />
    </>
  );
}

export default App;