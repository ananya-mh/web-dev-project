import { useParams, useNavigate } from 'react-router-dom';
import './index.css';
import * as client from './client';
import { setQuiz } from './reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function QuizDetails () {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchQuiz = async () => {
      if (qid !== 'New') {
        const quiz = await client.findQuizByQuizId(qid as string);
        dispatch(setQuiz(quiz));
      }
  };

  useEffect(() => {
    fetchQuiz();
  }, [cid, qid]);

const { currentUser } = useSelector((state: any) => state.accountReducer);

  const handleTakeQuiz = () => {
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`);
  };

  return (
    <div id='wd-quizzes'>
        <div
            id='wd-quiz-control-buttons'
            className='text-nowrap align-self-center' >
            {currentUser.role === 'STUDENT' && ( <>
                    <div>
                    <button id='wd-take-quiz-btn'
                        className='btn btn-lg btn-danger text-center me-1'
                        onClick={handleTakeQuiz} >
                        Take the Quiz </button>
                    </div>
                    </>
                )
            }
        </div>
    </div>
    )
}