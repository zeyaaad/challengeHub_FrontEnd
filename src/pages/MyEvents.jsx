import React from 'react'
import { useContext } from 'react'
import { MyContext } from '../context/context'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import img from "../components/imgs/com.jpeg";

import "./css/home.css";
export default function MyEvents() {
    const{token,Host,formatDate}=useContext(MyContext);
    let[data,setData]=useState(null)

    useEffect(()=>{
        getData()
    },[])
 
    async function getData(){
        try {
            let res=await axios.get(`${Host}/api/competation/joined-events`,{
                headers:{
                    token:token
                }
            })
            console.log(res.data)
            setData(res.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <div className='myeventscont'>
      {data!==null?
      <>
        {data.length>0?<>
        <h3 className='mt-3'> All Events Are You Joined: </h3>
        <hr />
             <div className='allEvents mt-3'>
     
        
          {data.map((event) => (
            event.com_id&&
            <div className="card bg-dark text-white mb-2" key={event._id}>
              <Link to={`/event/${event.com_id?._id}`}>
                <img src={img} className="card-img-top" alt={event.name} />
              </Link>
              <div className="card-body">
                <h3 className="card-title">{event.com_id?.name}</h3>
                <p className="card-text">{event.com_id?.desc}</p>
                <p className='eventType'>{event.com_id?.type ? "Online Event" : "Offline Event"}</p>
                <hr />
                <p className='mt-0 mb-0'>Join At: {formatDate(event.createdAt)}</p>
                <hr />
                    {event.com_id?.type ? (
                      <Link to={`/score/${event.com_id?._id}`} className='btn btn-success mt-0 mx-auto text-center'>View My Score</Link>
                    ) : (
                      <Link to={`/event/${event.com_id?._id}`} className='btn btn-success mt-0 mx-auto text-center'>Already Subscribed</Link>
                    )}
                
              </div>
            </div>
          ))}
      </div>
        
        
        </>
        :
        <div className='text-center mt-5' >
            <h1 className='text-danger'> You dont Join to any Event ! </h1>
            <Link className='text-primary' to="/events" > View All Events </Link>
        </div>
            }
      
      </>
      :<Loading/>}
    </div>
  )
}
