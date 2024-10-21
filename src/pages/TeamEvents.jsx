import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../context/context';
import axios from 'axios';
import Loading from '../components/Loading';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TeamEvents() {
    let { Host, adminToken, formatDate } = useContext(MyContext);
    let [data, setData] = useState(null);
    let [teamData, setTeamData] = useState(null);
    let { id } = useParams();
    const go = useNavigate();

    useEffect(() => {
        getEvents();
    }, []);

    async function getEvents() {
        try {
            console.log("Fetching events...");  
            let res = await axios.get(`${Host}/api/admin/teamEvents/${id}`, {
                headers: {
                    token: adminToken
                }
            });
            console.log("Response data:", res.data);  
            setTeamData(res.data.team);
            setData(res.data.data);
        } catch (error) {
            console.error("Failed to fetch events:", error.response ? error.response.data : error.message);
            toast.error("Failed to load events");
        }
    }

    return (
        <div className='h-100 container'>
            <ToastContainer />
            {data ? (
                <>
                 <h2 className='text-center'> All Events for Team {teamData?.name} </h2>
                    <h4 className='text-center'> Events Count : {data.length} </h4>
                    <hr />
                {data.length>0?<>
               
                    <table className='mt-4 table table-dark table-hover text-center'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Event Name</th>
                                <th>Event type</th>
                                <th>Score</th>
                                <th>Join At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((event, i) => (
                                <tr key={event._id}>
                                    <td>{i + 1}</td>
                                    <td>{event.com_id?.name}</td>
                                    <td>{event.com_id?.type ? "Online" : "Offline"}</td>
                                    <td>{event.com_id?.type ? event.final_result : "__"}</td>
                                    <td>{formatDate(event.createdAt)}</td>
                                    <th>
                                        {event.com_id.type ? (
                                            <Link to={`/scoreDetalis/${event._id}`} className='btn btn-primary'>
                                                Score Details
                                            </Link>
                                        ) : (
                                            "__"
                                        )}
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                
                </>:<h2 className='text-center text-danger mt-4'> This Team didn't Join at any Event ! </h2>}
                    
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}
