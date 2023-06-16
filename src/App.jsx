import { Routes, Route ,useLocation } from "react-router-dom";
import React from "react";
import "./App.scss";

import AD_home from "./Component/FE_admin/AD_component/AD_home";

// FE-User
import Homepage from "./Component/FE_user/Layout/Page/Home/Homepage";
import NobelPrizes from "./Component/FE_user/Layout/Page/NobelPrizes/NobelPrizes";
import AlfredNobel from "./Component/FE_user/Layout/Page/AlfredNobel/AlfredNobel";
import WillAlfedNobel from "./Component/FE_user/Layout/Page/WillAlfedNobel/WillAlfedNobel";
import Navbar from "./Component/FE_user/Layout/Navbar";
import Footer from "./Component/FE_user/Layout/Footer";
import ScollToTop from "./Component/FE_user/Layout/ScrollToTop";
import BiographyContent from "./Component/FE_user/Layout/Page/Biography/BiographyContent";

function App() {
  const location = useLocation();
  
  return (
    <>
      {/* Admin */}
      <Routes>
        <Route path="/admin" element={<AD_home />} />
      </Routes>

      {/* User */}
      {location.pathname ==="/nobel-prizes" || location.pathname === "/alfred-nobel/nobel-will"  || location.pathname === "/"  || location.pathname==='/alfred-nobel' ? <Navbar /> : null}
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/nobel-prizes" element={<NobelPrizes />} />
        <Route path="/alfred-nobel" element={<AlfredNobel />} />
        <Route path="/alfred-nobel/nobel-will" element={<WillAlfedNobel />} />
        <Route path="/chemistry/biography-mariecurie" element={<BiographyContent />} />
      </Routes>
      <ScollToTop />
    </>
  );
}

export default App;