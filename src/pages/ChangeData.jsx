import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from '../context/context'
import axios from 'axios';
import Loading from '../components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Joi from 'joi';

export default function ChangeData() {
   const{Host,token,formatDate}=useContext(MyContext);
    let[Data,setData]=useState()
      const [teamType, setTeamType] = useState(0);
    const[Errorr,setErrorr]=useState(null)
    useEffect(()=>{
        getData();
    },[])
    let[errors,setErrors]=useState([])
    async function getData(){
        try {
            let res=await axios.get(`${Host}/api/team`,{
                headers:{
                    token:token
                }
            })
            setData(res.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const schema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z0-9 _]+$/).required().label('Team Name'),
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    type: Joi.number().valid(0, 1).required().label('Team Type'), 
    
    teamCount: Joi.when('type', {
      is: 1,
      then: Joi.number().valid(4, 5).required().label('Team Count'),
      otherwise: Joi.forbidden() 
    }),
    
    members: Joi.when('type', {
      is: 1,
      then: Joi.array().items(
        Joi.string().pattern(/^[a-zA-Z0-9 _]+$/).required().label('Member Name')
      ).min(4).max(5).required(),
      otherwise: Joi.forbidden()
    })
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleTypeChange = (e) => {
    const type = parseInt(e.target.value);
    setData({ 
      ...Data, 
      type,
      members: Array(4).fill('') 
    });
    setTeamType(type);
  };

  const handleTeamCountChange = (e) => {
    const count = parseInt(e.target.value);
    setData({ 
      ...Data, 
      teamCount: count, 
      members: Array(count).fill('') 
    });
  };

  const handleMemberChange = (e, index) => {
    const members = [...Data.members];
    members[index] = e.target.value; 
    setData({ ...Data, members });
  };
    const validateForm = () => {
      delete Data["_id"]
      delete Data["__v"]
      delete Data["updatedAt"]
      delete Data["createdAt"]
      if(Data.type==0){
        delete Data["teamCount"];
        delete Data["members"]
      }
    const { error } = schema.validate(Data, { abortEarly: false });
    if (!error) return null;
    
    const validationErrors = {};
    error.details.forEach((detail) => {
      validationErrors[detail.path[0]] = detail.message;
    });
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(validationErrors);
      console.log(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await axios.put(`${Host}/api/team`, Data,{
        headers:{
          token:token
        }
      });
      console.log(response.data);
      setErrorr(null)
       toast.success("Profile Data Changed Successfully", {
              position: "top-center",
              autoClose:3000,
              hideProgressBar: false,
              pauseOnHover: false,
              draggable: true
        });
    } catch (error) {
        if(error.response.status==409){
            setErrorr("The Email Already Exist")
        }else {
            setErrorr("err to change Data")
        }
      console.error(error);
    }
  };
  return (
    <div>
      <ToastContainer/>
      {Data? <form onSubmit={handleSubmit} className='loginform'>
        <h2> Update Your Data  </h2>
        <hr />
        {Errorr&&<p className='alert alert-danger'>{Errorr}</p>}
      <div>
        <label className="mt-2" htmlFor="name">Team Name</label>
        <input className='form-control'
          type="text"
          name="name"
          value={Data.name}
          onChange={handleChange}
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div>
        <label className="mt-2" htmlFor="email">Team Email</label>
        <input className='form-control'
          type="email"
          name="email"
          value={Data.email}
          onChange={handleChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      
      <div>
        <label className="mt-2" htmlFor="type">Team Type</label>
        <select name="type"  className='form-control mt-1' onChange={handleTypeChange}  value={Data.type} >
          <option value={0} >Individual</option>
          <option value={1} >Team</option>
        </select>
        {errors.type && <div className="error">{errors.type}</div>}
      </div>

      {/* Team Count (Only if Team is selected) */}
      {Data.type === 1 && (
        <div>
          <label className="mt-2" htmlFor="teamCount">Number of Team Members</label>
          <select  onChange={handleTeamCountChange} className='form-control mt-1' name="teamCount" value={Data.teamCount} >
            <option value={4}>4 Members</option>
            <option value={5}>5 Members</option>
          </select>
          {errors.teamCount && <div className="error">{errors.teamCount}</div>}
        </div>
      )}

      {/* Team Members (Only if Team is selected) */}
      {Data.type  === 1 && Data.members.map((member, idx) => (
        <div key={idx}>
          <label className="mt-2" htmlFor={`member${idx}`}>Member {idx + 1} Name</label>
          <input className='form-control'
           onChange={(e) => handleMemberChange(e, idx)}
            type="text"
            name={`member${idx}`}
            value={member}
          />
          {errors[`members.${idx}`] && <div className="error">{errors[`members.${idx}`]}</div>}
        </div>
      ))}

      {/* Submit Button */}
      <button className='btn btn-primary mt-3' type="submit">Update</button>
    </form>:<Loading/>}
    </div>
  )
}
