import React, { useContext, useState, useEffect } from 'react';
import { MyContext } from '../context/context';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import "./css/event.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Event() {
  const { Host, token, formatDate } = useContext(MyContext);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [eventData, setEventData] = useState(null);
  const [eventEqs, setEventEqs] = useState(null);
  const [start, setStart] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]); 
  const [error, setError] = useState(null); 
  let[Loader,setLoader]=useState(false)
  useEffect(() => {
    if (!id) {
      navigate("/home");
      return;
    }
    getData();
  }, [id]);
  
  async function getData() {
    try {
      let res = await axios.get(`${Host}/api/competation/${id}`, {
        headers: {
          token: token
        }
      });
      console.log(res.data)
      setEventData(res.data.data);
      setEventEqs(res.data.equations);
    } catch (error) {
        if(error.response.data.message=="You are Already joined"){
            setEventData("joined")
        }
      console.log(error);
    }
  }

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers(prevAnswers => {
      const existingAnswer = prevAnswers.find(a => a._id === questionId);
      if (existingAnswer) {
        return prevAnswers.map(a => (a._id === questionId ? { ...a, answer } : a));
      } else {
        return [...prevAnswers, { _id: questionId, answer }];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedAnswers.length !== eventEqs.length) {
      setError("Please answer all the questions before submitting.");
      return;
    }
    setLoader(true)
    try {
      const response = await axios.post(`${Host}/api/competation/sendAnswers`, {
        com_id: id, 
        answers: selectedAnswers
      }, {
        headers: {
          token: token
        }
      });
      
      if (response.data.message === "success") {
        console.log(response)
        setStart(false);
        navigate(`/score/${id}`)
        
      } else {
        setError("Failed to submit answers.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to submit answers.");
    }
    setLoader(false)
  };


  async function subscribe(id){
    setLoader(true)
    try {
      let res=await axios.post(`${Host}/api/competation/subscribe`,{
        com_id:id
      },{
        headers:{
          token:token
        }
      })
      toast.success("subscribe Done successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      });
     getData();
  } catch (error) {
    console.log(error)
  }
  setLoader(false)
  }
  async function unSubscribe(id){
    setLoader(true)
    try {
      let res=await axios.post(`${Host}/api/competation/unSubscribe`,{
        com_id:id
      },{
        headers:{
          token:token
        }
      })
      console.log(res)
      toast.info("unSubscribe Done successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: true
      });
     getData();
  } catch (error) {
    console.log(error)
  }
  setLoader(false)
  }

  return (
    <div className='eventpage pt-3'>
      <ToastContainer/>
        {Loader&&<Loading/>}
      {eventData ? (
        <>
        {eventData=="joined"?<div className='text-center mt-5'>
            <h3 className='text-center text-success mt-5'>You Are Already Joind at this Event</h3>
            <Link  to="/home" > Back </Link>
            </div>:
        <>
        {!start && (
            <div className="contEventInfo mx-auto text-center">
              <h2>{eventData.name}</h2>
              <hr />
              <p>Description: {eventData.desc}</p>
              {eventData.type == 1 && (
                <>
                  <p>Total Degree: {(eventEqs?.length || 0) * eventData.eqDegree}</p>
                  <p>Number of equations: {eventEqs?.length || 0}</p>
                  <p>Equation degree: {eventData.eqDegree}</p>
                </>
              )}
              <p>Event Type: {eventData.type ? "Online Event" : "Offline Event"}</p>
              <p>Created At: {formatDate(eventData.createdAt)}</p>
              <p>Deadline At: {eventData.expire ? formatDate(eventData.expire) : "No Deadline"}</p>
              <div className="footerr mt-5">
                <Link to="/home" className="btn btn-danger me-3">Back to home</Link>
                {eventData.type ? (
                  <button className="btn btn-primary" onClick={() => setStart(true)}>Start</button>
                ) : (
                  eventData&&eventData.joined?
                  <button onClick={()=>unSubscribe(eventData._id)} className="btn btn-success">Un Subscribe</button>
                  :
                  <button className="btn btn-primary" onClick={()=>subscribe(eventData._id)}>Subscribe to Event</button>
                )}
              </div>
            </div>
          )}
        </>
        }
        
          {start && (
            <div className="questions-section mx-auto tex-center p-3">
              <h3 >Answer the following questions:</h3>
              <hr/> <hr />
              <div className="allEqs">
                {eventEqs && eventEqs.map((eq, index) => (
                    <div key={eq._id} className="question-block">
                    <h4>{index + 1}. {eq.eq}</h4>
                    <div className="answers">
                        {eq.answers.map((answer, i) => (
                        <div key={i} className="form-check">
                            <input 
                            type="radio" 
                            className="form-check-input"
                            name={`question-${eq._id}`} 
                            id={`question-${eq._id}-answer-${i}`} 
                            value={answer} 
                            onChange={() => handleAnswerChange(eq._id, answer)}
                            checked={selectedAnswers.find(a => a._id === eq._id)?.answer === answer}
                            />
                            <label className="form-check-label" htmlFor={`question-${eq._id}-answer-${i}`}>
                            {answer}
                            </label>
                        </div>
                    ))}
                  </div>
                  <hr />
                </div>
                
              ))}
              
              {error && <p className="text-danger">{error}</p>}

              <div className="mt-4">
                <button onClick={()=>setStart(false)} className="btn btn-danger" >Cancel</button>
                <button className="btn btn-success ms-3" onClick={handleSubmit}>Submit Answers</button>
              </div>
              </div>
             

            </div>
          )}
        </>
      ) : <Loading />}
    </div>
  );
}
