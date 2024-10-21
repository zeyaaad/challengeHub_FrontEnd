import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/context'
import axios from 'axios';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

export default function Teams() {
    let{Host,adminToken,formatDate}=useContext(MyContext);
    let [data,setData]=useState(null);
    useEffect(()=>{
        getEvents()
    },[])

    async function getEvents(){
        try {
            let res=await axios.get(`${Host}/api/admin/allTeams`,{
                headers:{
                    token:adminToken
                }
            })
            console.log(res)
            setData(res.data.data);
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='h-100 container'>
      {data?<>
      <h3> All Events  </h3>
      <hr />
        <table className='mt-4 table table-dark table-hover text-center' >
            <thead>
                <th> Name </th>
                <th> Eamil </th>
                <th> type </th>
                <th> Members count </th>
                <th> Join At </th>
                <th> Action </th>
            </thead>
            <tbody>
                {data.map((team)=>
                <tr>
                    <td> {team.name} </td>
                    <td> {team.email} </td>
                    <td> {team.type?"Team Group":"Individual"} </td>
                    <td> {team.teamCount?team.teamCount :1} </td>
                    <td> {formatDate(team.createdAt)} </td>
                    <th> <Link className='btn btn-primary' to={`/team-events/${team._id}`}> View his events </Link> </th>
                </tr>)}
            </tbody>
        </table>


      </>:<Loading/>}
    </div>
  )
}
