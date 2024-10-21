import React from 'react'
import imgg from"../imgs/img1.png"
import imgg1 from"../imgs/fetures.png"
import imgg11 from"../imgs/lastt.png"
import "./css/main.css"
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
export default function Home() {
  return (
    <div>
      <div className="setionOne">
      <div>
        <h3>
            <span className='firstmain' >ChallengeHub</span>: Where Players Compete, Connect, and Triumph!
        </h3>
          <p>
            Welcome to <span className='main' >ChallengeHub</span>  – Where Competitions Come Alive! Join thrilling tournaments, 
            track your scores in real-time, and rise to the top. Whether you're competing solo or as a team,
             ChallengeHub is your ultimate destination for all things competitive. Let the games begin!
        </p>
        <Link className="btn btn-primary " to="/events"> View all Events </Link>
      </div>
       <div>
         <img width={700} src={imgg} alt="" />
       </div>
      </div>
      <hr />
      <h2 className='text-center'> Features: </h2>
      <div className='sectionTwo' >
    
    <main>
        <section class="feature-cards">
            <div class="feature-card">
                <h2>User Management</h2>
                <p>Manage participants easily with role-based access control and secure registration.</p>
              
            </div>
            <div class="feature-card">
                <h2>Tournament Management</h2>
                <p>Create, edit, and delete tournaments effortlessly with automated scheduling.</p>
              
            </div>
            <div class="feature-card">
                <h2>Authentication</h2>
                <p>Secure login processes ensure that only authorized users access tournament details.</p>
              
            </div>
            <div class="feature-card">
                <h2>Scoring System</h2>
                <p>Automatically calculate scores and track performance across multiple events.</p>
              
            </div>
            <div class="feature-card">
                <h2>Reporting</h2>
                <p>Generate detailed reports and export results in various formats.</p>
              
            </div>
            <div class="feature-card">
                  <h2>Admin Dashboard</h2>
                <p>Access an intuitive dashboard to manage all tournament aspects, track scores, and ensure smooth event execution from a single interface.</p>
            </div>
        </section>
    </main>
    <div>
        <img src={imgg1} width={600} alt="" />
    </div>
      </div>
      <hr />
      <div className='lastSec'>
        <img src={imgg11} width={500} alt="" />
      </div>
    </div>
  )
}
