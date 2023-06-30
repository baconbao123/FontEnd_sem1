

import { Routes, Route ,useLocation } from "react-router-dom";
import React from "react";
import "./App.scss";

import AD_home from "./Component/FE_admin/AD_component/AD_home";
import AD_show from "./Component/FE_admin/AD_component/AD_show";
import AD_life from "./Component/FE_admin/AD_component/AD_life";
import AD_disable_show from "./Component/FE_admin/AD_component/AD_disable_show";
import AD_disable_life from "./Component/FE_admin/AD_component/AD_disable_life";
import AD_prizes from "./Component/FE_admin/AD_component/AD_prizes";
import AD_disable_prize from "./Component/FE_admin/AD_component/AD_disable_prize";
import AD_setprize from "./Component/FE_admin/AD_component/AD_setprize";
import AD_disable_setprize from "./Component/FE_admin/AD_component/AD_disable_setprize";
import AD_blog from "./Component/FE_admin/AD_component/AD_blog";
import AD_disable_blog from "./Component/FE_admin/AD_component/AD_disable_blog";
import AD_login from "./Component/FE_admin/AD_component/AD_login";
// FE-User
import Homepage from "./Component/FE_user/Layout/Page/Home/Homepage";
import NobelPrizes from "./Component/FE_user/Layout/Page/NobelPrizes/NobelPrizes";
import AlfredNobel from "./Component/FE_user/Layout/Page/AlfredNobel/AlfredNobel";
import WillAlfedNobel from "./Component/FE_user/Layout/Page/WillAlfedNobel/WillAlfedNobel";
import Navbar from "./Component/FE_user/Layout/Navbar";
import Footer from "./Component/FE_user/Layout/Footer";
import ScollToTop from "./Component/FE_user/Layout/ScrollToTop";
import BiographyContent from "./Component/FE_user/Layout/Page/Biography/BiographyContent";
import Blog from "./Component/FE_user/Layout/Page/Blog/Blog";
import BlogDetail from "./Component/FE_user/Layout/Page/Blog/BlogDetail";
import Laureates from "./Component/FE_user/Layout/Page/Laureates/Laureates";

import DetailNobelPrize from "./Component/FE_user/Layout/Page/DetailNobelPrize/DetailNobelPrize";



function App() {
  const location = useLocation();
  
  return (
    <>
      {/* Admin */}
      <Routes>
        <Route exact  path="/admin" element={<AD_home />} />
        <Route  path="/admin/show" element={<AD_show />} />
        <Route path="/admin/life" element={<AD_life/>} />
        <Route path="/admin/prize" element={<AD_prizes/>} />
        <Route path="/admin/blog" element={< AD_blog/>} />
        <Route path="/admin/disable/show" element={<AD_disable_show/>} />
        <Route path="/admin/disable/life" element={<AD_disable_life/>} />
        <Route path="/admin/disable/prize" element={<AD_disable_prize/>} />
        <Route path="/admin/setprize" element={<AD_setprize/>} />
        <Route path="/admin/disable/setprize" element={< AD_disable_setprize/>} />
    
        <Route path="/admin/disable/blog" element={< AD_disable_blog/>} />
        <Route path="/login" element={< AD_login/>} />
      </Routes>

      {/* User */}
      {location.pathname ==="/nobel-prizes" ||location.pathname ==="/laureates" || location.pathname === "/alfred-nobel/nobel-will"  || location.pathname === "/"  || location.pathname==='/alfred-nobel' || location.pathname==='/blog' ||  location.pathname.startsWith('/biography/')  || location.pathname.startsWith('/blog/') || location.pathname.startsWith('/nobel-prizes/') ? <Navbar /> : null}
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/nobel-prizes" element={<NobelPrizes />} />
        <Route path="/laureates" element={<Laureates />} />
        <Route path="/alfred-nobel" element={<AlfredNobel />} />
        <Route path="/alfred-nobel/nobel-will" element={<WillAlfedNobel />} />
        <Route path="/biography/:id" element={<BiographyContent />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/nobel-prizes/:name/:year/:id" element={<DetailNobelPrize />} />
      </Routes>
      <ScollToTop />
    </>
  );
}

export default App;