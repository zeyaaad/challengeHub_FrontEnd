import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { MyContext } from '../context/context'
import "./css/main.css"
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
export default function Dashboard() {
    const{adminToken,Host}=useContext(MyContext)

  let[events,setEvents]=useState(null)
  let[teams,seTteams]=useState(null)


  async function getData(){
    try {
      let events=await axios.get(`${Host}/api/competation`,{
                headers:{
                    token:adminToken
                }
      })
      let teams=await axios.get(`${Host}/api/admin/allTeams`,{
                headers:{
                    token:adminToken
                }
          })

        seTteams(teams.data.data.length);
        setEvents(events.data.data.length);
      
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getData();
  })


  return (
    <div className='container ps-5'>
      {events&&teams?<>
      
       <h2 className='text-center'> Dashboard Home  </h2>
      <hr />
      <h6> Here The damin can meage the all events ,scores and teams </h6>
 <main>
        <section class="feature-cardss">
              <Link to="/all-events">
            <div class="feature-card">
                <h2>Number of Teams</h2>
                <h1> {teams} </h1>
                <Link to="/all-events" className='btn btn-primary'> View all </Link>
            </div>
               </Link>
            
              <Link  to="/teams">
            <div class="feature-card">
                <h2>Number of Events</h2>
                <h1> {events} </h1>
                <Link to="/teams" className='btn btn-primary'> View all </Link>
             
              
            </div>
              </Link>
         
        </section>
    </main>
      
      </>:<Loading/>}
     
    </div>
  )
}
