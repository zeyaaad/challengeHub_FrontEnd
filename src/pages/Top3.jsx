import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MyContext } from '../context/context'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Loading from '../components/Loading'

export default function Top3() {
    const{id}=useParams()
    const{Host,token}=useContext(MyContext);
    let[data,setData]=useState(null);
    let[err,setErr]=useState(null)
    const go=useNavigate()

    useEffect(()=>{
        if(!token){
            go("/home")
            return
        }
        getData();
    },[])

    async function getData(){
        try {
            let res=await axios.get(`${Host}/api/score/high/${id}`,{
                headers:{
                    token:token
                }
            })
            setData(res.data.data)
            setErr(null)
            console.log(res)
        } catch (error) {
            setErr("Not Found event 404")
            console.log(error)
        }
    }

    if(err) return<div className='text-center'>  <h1 className='text-center mt-5 text-danger'> {err} </h1> <Link to="/home" > Back to home </Link> </div>
  return (
    <div>
     {data?
     <>
     {data.length>0?<>
     <div className='allRankes' >

     {data.map((item,i)=><div className='rank' >
        <h2> Rank {i+1} </h2>
        <h3>  Name :{item.team_id.name} </h3>
        <h3> Score : {item.final_result} </h3>
     </div>)}
     <hr />
     <div className='text-center'>

     <Link className='btn btn-primary mx-auto' to={`/score/${id}`}> Back   </Link>
     </div>
     </div>
     
     </>:<h2 className='text-center mt-4' > No ranked Yet at this Competation </h2>}
     </>
     
     :<Loading/>}
    </div>
  )
}
