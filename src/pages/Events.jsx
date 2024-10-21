import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/context'
import axios from 'axios';
import Loading from '../components/Loading';
import"./css/home.css"
import { Link } from 'react-router-dom';
import img from "../components/imgs/com.jpeg"
import { data } from 'jquery';
export default function Events() {
  const{token,Host,formatDate}=useContext(MyContext);
  let[events,setEvents]=useState(null);
useEffect(()=>{
    getEvents();
  },[])


  async function getEvents(){
    try {
      let res=await axios.get(`${Host}/api/competation`,{
        headers:{
          token:token
        }
      })
      setEvents(res.data.data);
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  }

  


  return (
    <div className='myeventscont'>
      {events?<>
      <h1 className='text-center mt-4 ' > All available Events  </h1>
      <hr />
      <div className="allEvents">
        {events.map((event)=>

  <div className="card bg-dark text-white mb-2">
    <Link to={`/event/${event._id}`}>
      <img src={img} className="card-img-top" alt="..." />
    </Link>
    <div className="card-body">
      <h3 className="card-title">{event.name}</h3>
      <p className="card-text">{event.desc}</p>
      <p className="eventType">{event.type ? "Online Event" : "Offline Event"}</p>
      <hr />
      <p className="mt-0 mb-0">Created At: {formatDate(event.createdAt)}</p>
      <p>Deadline: {event.expire ? formatDate(event.expire) : "No Deadline"}</p>
      <hr />
      {event.joined ? (
        <>
          {event.type ? (
            <Link to={`/score/${event._id}`} className="btn btn-success mt-0 mx-auto text-center">
              View My Score
            </Link>
          ) : (
            <Link to={`/event/${event._id}`} className="btn btn-success mt-0 mx-auto text-center">
              Already subscribed
            </Link>
          )}
        </>
      ) : (
        <Link className="btn btn-primary" to={`/event/${event._id}`}>
          View The Event
        </Link>
      )}
    </div>
  </div>



        )}
      </div></>:<Loading/>}
    </div>
  )
}
