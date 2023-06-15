import { Routes, Route, Link } from "react-router-dom";

import React, { useRef } from "react";
import "./App.scss";

import AD_home from "./Component/FE_admin/AD_component/AD_home";

// FE-User
import Homepage from "./Component/FE_user/Layout/Page/Home/Homepage";
import NobelPrizes from "./Component/FE_user/Layout/Page/NobelPrizes/NobelPrizes";
import AlfredNobel from "./Component/FE_user/Layout/Page/AlfredNobel/AlfredNobel";
import Navbar from "./Component/FE_user/Layout/Navbar";
function App() {
  return (
    <>
      {/* amdin */}
      <Routes>
        <Route path="/admin" element={<AD_home />} />
      </Routes>
      {/* =======================user =========================*/}
      {/* Navbar */}
      <Navbar/>
      <Routes>
          <Route path="/" element ={<Homepage/>}/>
          <Route path="/nobel-prizes" element ={<NobelPrizes/>}/>
          <Route path="/alfred-nobel" element ={<AlfredNobel/>}/>
      </Routes>
    </>
  );
}

export default App;
