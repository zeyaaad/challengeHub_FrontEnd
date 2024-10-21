import { Component, useEffect, useState ,useContext} from "react"
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 

import { Route, Routes } from 'react-router';
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { MyContext } from "./context/context";
import Home from "./pages/Home";
import Event from "./pages/Event";
import Score from "./pages/Score";
import Events from "./pages/Events";
import Top3 from "./pages/Top3";
import SearchPage from "./pages/SearchPage";
import MyEvents from "./pages/MyEvents";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import ChangeData from "./pages/ChangeData";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/WebLayout";
import AdminLayout from "./components/AdminLayout";
import LogIAdmin from "./pages/LoginAdmin";
import Teams from "./pages/Teams";
import AllEvents from "./pages/AllEvents";
import AllScores from "./pages/AllScores";
import CreateEvent from "./pages/CreateEvent";
import AllSubscribes from "./pages/AllSubscribes";
import EventDetalis from "./pages/EventDetalis";
import TeamEvents from "./pages/TeamEvents";


export function APP(){
   const{ProtectAuth,ProtectRoute,ProtectAdmin,ProtectAdminAuth}=useContext(MyContext)
    return (
      <>
      <Routes>
        {/* Auth paths */}
        <Route path="/login" element={<ProtectAuth> <Layout> <Login/> </Layout>  </ProtectAuth> } />
        <Route path="/register" element={<ProtectAuth> <Layout><Register/> </Layout></ProtectAuth>} />
      
        {/* Admin Login */}
        <Route path="/admin-login" element={<ProtectAdminAuth> <Layout> <LogIAdmin/> </Layout>  </ProtectAdminAuth> } />





      {/* web paths */}
        <Route path="" element={<ProtectRoute > <Layout>  <Home/> </Layout>  </ProtectRoute>} />
        <Route path="/home" element={<ProtectRoute > <Layout>  <Home/> </Layout>  </ProtectRoute>} />
        <Route path="/events" element={<ProtectRoute > <Layout>  <Events/> </Layout>  </ProtectRoute>} />
        <Route path="/search" element={<ProtectRoute > <Layout>  <SearchPage/> </Layout>  </ProtectRoute>} />
        <Route path="/profile" element={<ProtectRoute > <Layout>  <Profile/> </Layout>  </ProtectRoute>} />
        <Route path="/myEvents" element={<ProtectRoute > <Layout>  <MyEvents/> </Layout>  </ProtectRoute>} />
        <Route path="/event/:id" element={<ProtectRoute > <Layout>  <Event/> </Layout>  </ProtectRoute>} />
        <Route path="/score/:id" element={<ProtectRoute > <Layout>  <Score/> </Layout>  </ProtectRoute>} />
        <Route path="/top3/:id" element={<ProtectRoute > <Layout>  <Top3/> </Layout>  </ProtectRoute>} />
        <Route path="/updateData" element={<ProtectRoute > <Layout>  <ChangeData/> </Layout>  </ProtectRoute>} />
        
        
        
        {/* Dashboard  */}
        
        <Route path="/dashboard" element={<ProtectAdmin><AdminLayout> <Dashboard/> </AdminLayout> </ProtectAdmin>} />
        <Route path="/all-events" element={<ProtectAdmin><AdminLayout> <AllEvents/> </AdminLayout> </ProtectAdmin>} />
        <Route path="/teams" element={<ProtectAdmin><AdminLayout> <Teams/> </AdminLayout> </ProtectAdmin>} />
        <Route path="/all-scores/:id" element={<ProtectAdmin><AdminLayout> <AllScores/> </AdminLayout> </ProtectAdmin>} />
        <Route path="/scoreDetalis/:id" element={<ProtectAdmin><AdminLayout> <EventDetalis/> </AdminLayout> </ProtectAdmin>} />
        <Route path="/team-events/:id" element={<ProtectAdmin><AdminLayout> <TeamEvents/> </AdminLayout> </ProtectAdmin>} />
        <Route path="/all-subscribers/:id" element={<ProtectAdmin><AdminLayout> <AllSubscribes/> </AdminLayout> </ProtectAdmin>} />
        <Route path="/create-event" element={<ProtectAdmin><AdminLayout> <CreateEvent/> </AdminLayout> </ProtectAdmin>} />



      </Routes>
      </>
    )
  
}