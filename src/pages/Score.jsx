import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { MyContext } from '../context/context';
import "./css/score.css"
import Loading from '../components/Loading';
import "./css/rank.css"
export default function Score() {
  const { id } = useParams();
  const [scoreData, setScoreData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
    const{Host,token,formatDate}=useContext(MyContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Host}/api/score/${id}`,{
            headers:{
                token:token
            }
        });
        console.log(response.data)
        setScoreData(response.data.data);
      } catch (error) {
        console.error('Error fetching score data:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!scoreData) return <Loading/>;

  const totalAnswers = scoreData.true_eqs.length + scoreData.false_eqs.length;
  const wrongAnswersCount = scoreData.false_eqs.length;
  const correctAnswersCount = scoreData.true_eqs.length;

  return (
    <div className="score-container">
      <div className='text-center'>
        <h2> {scoreData.com_id.name}</h2>
        <hr />
      <p>Total Answers: {totalAnswers}</p>
      <p className='text-success'>Correct Answers: {correctAnswersCount}</p>
      <p className='text-danger'>Wrong Answers: {wrongAnswersCount}</p>
      <p>Answerd At : {formatDate(scoreData.createdAt)}</p>
      <h3>Final Result: {scoreData.final_result}/{totalAnswers*scoreData.com_id.eqDegree}</h3>

      <button className='btn btn-primary' onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Answers' : 'Show My Answers'}
      </button>
    <hr />
    <Link className='btn btn-info' to={`/top3/${id}`} > Show Top 3 Rank </Link>
      </div>
      {showDetails && (
        <div className="answer-details">
            <hr />
          <h4>True Answers:</h4>
          {scoreData.true_eqs.length > 0 ? (
            scoreData.true_eqs.map((eq) => (
              <div key={eq._id} className="true-answer" style={{ backgroundColor: 'green', margin: '10px 0', padding: '10px' }}>
                <strong>{eq.eq}</strong>
                <div className="options">
                  {eq.answers.map((answer, index) => (
                    <label key={index} style={{ display: 'block' }}>
                      <input type="radio" name={`true_${eq._id}`} value={answer} checked={answer === eq.true_answer} readOnly />
                      {answer}
                    </label>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No correct answers found.</p>
          )}

          <h4>Wrong Answers:</h4>
          {scoreData.false_eqs.length > 0 ? (
            scoreData.false_eqs.map((eq) => (
              <div key={eq._id} className="wrong-answer" style={{ backgroundColor: '#eee', margin: '10px 0', padding: '10px' }}>
                <strong>{eq.eq}</strong>
                <div className="options">
                  {eq.answers.map((answer, index) => (
                    <label key={index} style={{ display: 'block', color: answer === eq.your_answer ? 'red' : 'black' }}>
                      <input
                        type="radio"
                        name={`false_${eq._id}`}
                        value={answer}
                        checked={answer === eq.your_answer} 
                        readOnly
                      />
                      {answer}
                    </label>
                  ))}
                </div>
                <p style={{ color: 'green' }}>
                  <strong>Correct Answer:</strong> {eq.true_answer}
                </p>
              </div>
            ))
          ) : (
            <p>No wrong answers found.</p>
          )}
        </div>
      )}
    </div>
  );
}
