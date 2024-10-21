import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import img from "../components/imgs/com.jpeg";
import { MyContext } from '../context/context';
import "./css/home.css";
import Loading from '../components/Loading';

const SearchPage = () => {
  const { token, Host, formatDate } = useContext(MyContext);
  const [searchTerm, setSearchTerm] = useState(null);
  let[loader,setLoader]=useState(false)
  const [events, setEvents] = useState([]);
  
  const handleSearch = async (e) => {
    setLoader(true)
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim()) {
      try {
        const response = await axios.get(`${Host}/api/competation/search/${term}`, {
          headers: {
            token: token,
          },
        });

        setEvents(response.data.data); 
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    } else {
      setEvents([]); 
    }
    setLoader(false)
  };

  return (
    <div className=" searchpage">
      <h1 className='mt-3' >Search Events</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Enter event name"
        className="form-control mb-3"
      />
    <hr />
      <div className='allEvents'>
        {loader&&<Loading/>}
        {searchTerm&&searchTerm.trim() && events.length === 0 ? (
          <h3 className=" text-center mt-5 text-danger w-100">No Events Found</h3>
        ) : (
          events.map((event) => (
            <div className="card bg-dark text-white mb-2" key={event._id}>
              <Link to={`/event/${event._id}`}>
                <img src={img} className="card-img-top" alt={event.name} />
              </Link>
              <div className="card-body">
                <h3 className="card-title">{event.name}</h3>
                <p className="card-text">{event.desc}</p>
                <p className='eventType'>{event.type ? "Online Event" : "Offline Event"}</p>
                <hr />
                <p className='mt-0 mb-0'>Created At: {formatDate(event.createdAt)}</p>
                <p>Deadline: {event.expire ? formatDate(event.expire) : "No Deadline"}</p>
                <hr />
                {event.joined ? (
                  <>
                    {event.type ? (
                      <Link to={`/score/${event._id}`} className='btn btn-success mt-0 mx-auto text-center'>View My Score</Link>
                    ) : (
                      <Link to={`/event/${event._id}`} className='btn btn-success mt-0 mx-auto text-center'>Already Subscribed</Link>
                    )}
                  </>
                ) : (
                  <Link className='btn btn-primary' to={`/event/${event._id}`}>View The Event</Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
