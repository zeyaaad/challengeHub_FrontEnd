import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MyContext } from '../context/context';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
export default function AllSubscribes() {
    const{id}=useParams();
    let{Host,adminToken,formatDate}=useContext(MyContext);
    let [data,setData]=useState(null)
    const go=useNavigate()
    useEffect(()=>{
        if(!id){
            go("/all-events")
        }else {
            getData()
        }
    },[])
    async function getData(){
        try {
            let res=await axios.get(`${Host}/api/admin/getEvntsubscribes/${id}`,{
                headers:{
                    token:adminToken
                }
            })
            console.log(res.data)
            setData(res.data) ;
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
     {data!==null?
     <>
        <h2 className='text-center'> All Subscribers for {data.event.name} </h2>
        <hr />
        {data.data.length>0?
        <table className='table table-dark table-hover table-striped text-center ' >
            <thead>
                <th> Team name </th>
                <th> Team email </th>
                <th> Join At </th>
            </thead>
            <tbody>
                {data.data.map((item)=><tr>
                    <td> {item.team_id.name} </td>
                    <td> {item.team_id.email} </td>
                    <td> {formatDate(item.createdAt)} </td>
                    
                </tr>)}
            </tbody>
        </table>
        
        
        :
        <div className='text-center '>
        <h2 className='text-center mt-4 text-danger' > Not subscribes Yet at this Event ! </h2>
        <Link to="/all-events" className='btn btn-info' > Back  </Link>
        </div>
        } 


     
     </>:<Loading/>}
    </div>
  )
}
