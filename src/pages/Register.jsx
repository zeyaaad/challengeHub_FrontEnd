import React, { useState, useContext, useEffect } from 'react';
import Joi from 'joi';
import axios from 'axios';
import { MyContext } from '../context/context';
import "./css/auth.css";
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 0,
    teamCount: 4,
    members: Array(4).fill('') 
  });
  const go=useNavigate()
  const [errors, setErrors] = useState({});
  const [teamType, setTeamType] = useState(0); 
  const { Host } = useContext(MyContext);
  let[Errorr,setErrorr]=useState(null)
  let[loading,setLoadin]=usestata(false):
  const schema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z0-9 _]+$/).required().label('Team Name'),
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    password: Joi.string().min(6).max(25).required().label('Password'),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm Password'),
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
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (e) => {
    const type = parseInt(e.target.value);
    setFormData({ 
      ...formData, 
      type,
      members: Array(4).fill('') 
    });
    setTeamType(type);
  };

  const handleTeamCountChange = (e) => {
    const count = parseInt(e.target.value);
    setFormData({ 
      ...formData, 
      teamCount: count, 
      members: Array(count).fill('') 
    });
  };

  const handleMemberChange = (e, index) => {
    const members = [...formData.members]; 
    members[index] = e.target.value; 
    setFormData({ ...formData, members });
  };

  const validateForm = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (!error) return null;
    
    const validationErrors = {};
    error.details.forEach((detail) => {
      validationErrors[detail.path[0]] = detail.message;
    });
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    setLoadin(true);
    e.preventDefault();

    if (formData.type === 0) {
      delete formData.teamCount;
      delete formData.members;
    }
    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(validationErrors);
      console.log(validationErrors);
      setLoadin(false);
      return;
    }

    setErrors({});

    try {
      console.log(formData);
      const response = await axios.post(`${Host}/api/auth/register`, formData);
      console.log(response.data);
      setErrorr(null)
      setLoadin(false);
      go("/login");
  
    } catch (error) {
        if(error?.response?.status==409){
            setErrorr("The Email Already Exist")
        }else {
            setErrorr("Wrong to register")
        }
      setLoadin(false);
    }
  };

  return (
  <>
    
        <form onSubmit={handleSubmit} className='loginform'>
        <h2> Register  </h2>
        <hr />
        {Errorr&&<div className='alert alert-danger text-center'> {Errorr}  </div>}
      <div>
        <label className="mt-2" htmlFor="name">Team Name</label>
        <input className='form-control'
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div className='text-danger' >{errors.name}</div>}
      </div>

      <div>
        <label className="mt-2" htmlFor="email">Team Email</label>
        <input className='form-control'
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className='text-danger' >{errors.email}</div>}
      </div>

      <div>
        <label className="mt-2" htmlFor="password">Password</label>
        <input className='form-control'
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <div className='text-danger' >{errors.password}</div>}
      </div>

      <div>
        <label className="mt-2" htmlFor="confirmPassword">Confirm Password</label>
        <input className='form-control'
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
      </div>

      <div>
        <label className="mt-2" htmlFor="type">Team Type</label>
        <select name="type" className='form-control mt-1' value={formData.type} onChange={handleTypeChange}>
          <option value={0}>Individual</option>
          <option value={1}>Team</option>
        </select>
        {errors.type && <div className='text-danger' >{errors.type}</div>}
      </div>

      {/* Team Count (Only if Team is selected) */}
      {teamType === 1 && (
        <div>
          <label className="mt-2" htmlFor="teamCount">Number of Team Members</label>
          <select className='form-control mt-1' name="teamCount" value={formData.teamCount} onChange={handleTeamCountChange}>
            <option value={4}>4 Members</option>
            <option value={5}>5 Members</option>
          </select>
          {errors.teamCount && <div className='text-danger' >{errors.teamCount}</div>}
        </div>
      )}

      {/* Team Members (Only if Team is selected) */}
      {teamType === 1 && formData.members.map((member, idx) => (
        <div key={idx}>
          <label className="mt-2" htmlFor={`member${idx}`}>Member {idx + 1} Name</label>
          <input className='form-control'
            type="text"
            name={`member${idx}`}
            value={member}
            onChange={(e) => handleMemberChange(e, idx)}
          />
          {errors[`members.${idx}`] && <div className='text-danger' >>{errors[`members.${idx}`]}</div>}
        </div>
      ))}
      {errors.members&&<p className='text-danger' > {errors.members}</p>}

      {/* Submit Button */}
      <button className='btn btn-primary mt-3' type="submit">Register</button>
    </form>
  
  </>
  );
};

export default Register;
