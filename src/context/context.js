import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';

const MyContext = createContext();

const MyProvider = ({ children }) => {

    const[isLogIn,setIsLogIn]=useState(null)
    const[isAdmin,setIsAdmin]=useState(null)
  const token=localStorage.getItem("app_token")
  const adminToken=localStorage.getItem("admin_token")
    const Host="http://localhost:3000";

  

    async function checkauth(){
        if(!token){
          return setIsLogIn(false)
        }
        try {
            let res=await axios.get(`${Host}/api/auth/protectRoute`,{
              headers:{
                token:token
              }
            })
            setIsLogIn(res.data.status)
            checkAdmin()
        } catch (error) {
            setIsLogIn(false);
            console.log("Error to protect web",error)
        }
    }
    async function checkAdmin(){
        if(!adminToken){
          return setIsAdmin(false)
        }
        try {
            let res=await axios.get(`${Host}/api/admin/isAdmin`,{
              headers:{
                token:adminToken
              }
            })
            setIsAdmin(res.data.status);
        } catch (error) {
            setIsAdmin(false);
            console.log("Error to protect web",error);
        }
    }

    useEffect(()=>{
      checkauth()
      checkAdmin()
    },[])

function ProtectRoute({ children }){
  if (isLogIn == null) {
    return <Loading/>; 
  }

  return isLogIn ? children : <Navigate to="/login" />;
}



function ProtectAuth({ children }) {
  if (isLogIn === null) {
    return <Loading/>; 
  }
  return !isLogIn ? children : <Navigate to="/home" />;
}

function ProtectAdmin({ children }) {
  if (isAdmin === null) {
    return <Loading/>; 
  }
  return !isAdmin ? <Navigate to="/admin-login" />  :children ;
}

function ProtectAdminAuth({ children }) {
  if (isAdmin === null) {
    return <Loading/>; 
  }
  return isAdmin ? <Navigate to="/dashboard" />  :children ;
}





  function logOut(){
    localStorage.removeItem("app_token")
    window.location.reload()
  }



 const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12 || 12; 

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;

    return `${year}-${formattedMonth}-${formattedDay} ${hour}:${formattedMinute} ${ampm}`;
  };
    return (
        <MyContext.Provider value={{isAdmin, adminToken,ProtectAdminAuth,formatDate,Host,setIsAdmin,checkauth,ProtectAdmin,isLogIn,setIsLogIn,ProtectAuth,ProtectRoute,logOut,token }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyProvider, MyContext };
