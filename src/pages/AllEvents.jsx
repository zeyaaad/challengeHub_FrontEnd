import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/context'
import axios from 'axios';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AllEvents() {
    let{Host,adminToken,formatDate}=useContext(MyContext);
    let [data,setData]=useState(null);
    useEffect(()=>{
        getEvents()
    },[])

    async function getEvents(){
        try {
            let res=await axios.get(`${Host}/api/competation`,{
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


    async function delEvet(id){
        try {
            await axios.delete(`${Host}/api/admin/delEvent/${id}`,{
                headers:{
                    token:adminToken
                }
            })
            getEvents();
            toast.success("Event Deleted successfully !")
        } catch (error){
            console.log(error);
        }
    }
  return (
    <div className='h-100 container'>
        <ToastContainer/>
      {data?<>
      <h2 className='text-center '> All Events  </h2>
      <hr />
        <table className='mt-4 table table-dark table-hover text-center' >
            <thead>
                <th>#</th>
                <th> Name </th>
                <th> type </th>
                <th> allMembers count </th>
                <th> Created At </th>
                <th> Expire At </th>
                <th> Action </th>
            </thead>
            <tbody>
                {data.map((event,i)=>
                <tr>
                    <td>{i+1}</td>
                    <td> {event.name} </td>
                    <td> {event.type?"Online":"Offline"} </td>
                    <td> {event.allMembers} </td>
                    <td> {formatDate(event.createdAt)} </td>
                    <td>  {event.expire? formatDate(event.expire):"No Expire"} </td>
                    <th> 
                        {event.type?
                    <Link to={`/all-scores/${event._id}`} className='btn btn-primary'>  all Scores </Link> 
                        :
                        <Link  to={`/all-subscribers/${event._id}`} className='btn btn-primary'>  all Subscribers </Link> 
                        }
                        <button onClick={()=>delEvet(event._id)}  className='btn btn-danger ms-1' > Delete </button>
                    </th>
                </tr>)}
            </tbody>
        </table>


      </>:<Loading/>}
    </div>
  )
}
