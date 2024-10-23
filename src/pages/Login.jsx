import React, { useContext, useState } from 'react'
import "./css/auth.css"
import { MyContext } from '../context/context'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Loading from '../components/Loading';

export default function Login() {
  const { Host, getToken, setIsLogIn } = useContext(MyContext);
  let [email, setEmail] = useState(null);
  let [password, setPassword] = useState(null);
  let [err, setErr] = useState(null)
  let go = useNavigate()
  let [emailErr,setEmailErr]=useState(null)
  let [PasswordErr,setPasswordErr]=useState(null)
  let[Loader,setLoader]=useState(false)
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handelLogin = async (e) => {
    setLoader(true)
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailErr("Please enter a valid email.");
      return;
      setLoader(false);
    }else{
      setEmailErr("");
    }

    if (password.length < 6) {
      setPasswordErr("Password must be at least 6 characters long.");
      setLoader(false);
      return;
    }else {
      setPasswordErr("");
    }

    try {
      let res = await axios.post(`${Host}/api/auth/login`, {
        email,
        password
      })
      let decoded = jwtDecode(res.data.token);
      localStorage.setItem("app_token", res.data.token);
      localStorage.setItem("team_name", decoded.name);
      localStorage.setItem("team_data", JSON.stringify(decoded));
      setLoader(false);
      setIsLogIn(true)
      go("/home")
    } catch (error) {
      if (error.response?.data?.message === "Wrong email or password") {
        setErr("Wrong email or password");
      } else {
        setErr("Error logging in.");
      }
      console.log(error)
      setLoader(false);
    }
    setLoader(false);
  }
  return (
  Loader&&<Loading/>
    <div>
      <div className="loginform text-white">
        <h2>Login now:</h2>
        <hr />
        {err && <p className='alert alert-danger text-center'>{err}</p>}
        <form onSubmit={handelLogin}>
          <label className='mt-3' htmlFor="">Team Email:</label>
          <input onChange={(e) => setEmail(e.target.value)} type="text" className='form-control' />
          {emailErr&&<p className='text-danger' >{emailErr}</p>}
          <label className='mt-3' htmlFor="">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" className='form-control' />
          {PasswordErr&&<p className='text-danger' >{PasswordErr}</p>}
          <button type="submit" className='btn btn-primary mt-4'>Login</button>
        </form>
      </div>
    </div>
  )
}
