import React, { useState } from 'react';
import Joi from 'joi';
import axios from 'axios';
import"./css/CreateEvent.css"
import { useContext } from 'react';
import { MyContext } from '../context/context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateEvent = () => {
    const{adminToken,Host}=useContext(MyContext)
  const [formData, setFormData] = useState({
    name: '',
    type: 0, 
    desc: '',
    expire: '',
    eqDegree: null,
    numberOfEq: 0,
    eqs: []
  });
  const [errors, setErrors] = useState({});
  const [equations, setEquations] = useState([]); 

const schema = Joi.object({
  name: Joi.string().min(3).required().label('Event Name'),
  type: Joi.number().valid(0, 1).required().label('Event Type'),
  desc: Joi.string().required().label('Description'),
  expire: Joi.date().required().label('Expire Date'),
  eqDegree: Joi.number().label('Equation Degree'),
  numberOfEq: Joi.number().label('Number of Equations'),
  eqs: Joi.array().items(
    Joi.object({
      eq: Joi.string().required().label('Equation Name'),
      true_answer: Joi.string().required().label('Correct Answer'),
      answers: Joi.array().items(Joi.string().required()).length(4).label('Answers')
    })
  )
});


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'numberOfEq' && formData.type === '1') {
      const eqCount = parseInt(value);
      const newEqs = Array.from({ length: eqCount }, () => ({
        eq: '',
        true_answer: '',
        answers: ['', '', '', '']
      }));
      setEquations(newEqs);
    }
  };

  const handleEquationChange = (index, name, value) => {
    const updatedEqs = [...equations];
    if (name.startsWith('answer')) {
      const answerIndex = parseInt(name.split('-')[1], 10);
      updatedEqs[index].answers[answerIndex] = value;
    } else {
      updatedEqs[index][name] = value;
    }
    setEquations(updatedEqs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalFormData = { ...formData, eqs: equations };
    if(formData.type==0){
        delete finalFormData["eqDegree"];
        delete finalFormData["numberOfEq"]
        delete finalFormData["eqs"]
    }
    console.log(finalFormData);
    const result = schema.validate(finalFormData, { abortEarly: false });
    if (result.error) {
      const errorMessages = {};
      console.log(result.error);
      result.error.details.forEach(detail => {
        errorMessages[detail.path[0]] = detail.message;
      });
      setErrors(finalFormData);
      return;
    }
    try {
      const response = await axios.post(`${Host}/api/competation`, finalFormData, {
        headers: { token: adminToken }
      });
      console.log('Response:', response.data);
      toast.success("Event Created successfully")
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="event-form-container createEventPage">
        <ToastContainer/>
      <form onSubmit={handleSubmit}>
        <label>Event Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className='text-danger' >{errors.name}</p>}

        {/* Type Select */}
        <label>Type</label>
        <select name="type" value={formData.type} onChange={handleInputChange}>
          <option value={0}>Offline</option>
          <option value={1}>Online</option>
        </select>

        {/* Description */}
        <label>Description</label>
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleInputChange}
        />
        {errors.desc && <p className='text-danger'>{errors.desc}</p>}

        {/* Expiration Date */}
        <label>Expire Date</label>
        <input
          type="date"
          name="expire"
          value={formData.expire}
          onChange={handleInputChange}
        />
        {errors.expire && <p className='text-danger'>{errors.expire}</p>}

        {/* If Online, Show Equation Degree and Number of Equations */}
        {parseInt(formData.type) === 1 && (
          <>
            <label>Equation Degree</label>
            <input
              type="number"
              name="eqDegree"
              value={formData.eqDegree}
              onChange={handleInputChange}
            />
            {errors.eqDegree && <p className='text-danger'>{errors.eqDegree}</p>}

            <label>Number of Equations</label>
            <input
              type="number"
              max={50}
              name="numberOfEq"
              value={formData.numberOfEq}
              onChange={handleInputChange}
            />
            {errors.numberOfEq && <p className='text-danger'>{errors.numberOfEq}</p>}

            {/* Dynamic Equation Inputs */}
            {equations.map((eq, index) => (
              <div key={index} className="equation-container">
                <label>Equation {index + 1}</label>
                <input
                  type="text"
                  name="eq"
                  value={eq.eq}
                  onChange={(e) => handleEquationChange(index, 'eq', e.target.value)}
                />
                <label>Correct Answer</label>
                <input
                  type="text"
                  name="true_answer"
                  value={eq.true_answer}
                  onChange={(e) => handleEquationChange(index, 'true_answer', e.target.value)}
                />

                {/* Answers: Render 4 answers in a row */}
                <div className="answers-container">
                  {eq.answers.map((answer, i) => (
                    <input
                      key={i}
                      type="text"
                      name={`answer-${i}`}
                      value={answer}
                      placeholder={`Answer ${i + 1}`}
                      onChange={(e) => handleEquationChange(index, `answer-${i}`, e.target.value)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Create </button>
      </form>
    </div>
  );
};

export default CreateEvent;
