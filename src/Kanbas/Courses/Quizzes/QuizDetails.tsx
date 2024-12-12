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
    // try {
      if (qid !== 'New') {
        const quiz = await client.findQuizByQuizId(qid as string);
        dispatch(setQuiz(quiz));
      }
  };
//       const fetchedQuizDetails = await quizClient.findQuiz(
//         cid as string,
//         qid as string
//       );
//       setQuizDetails(fetchedQuizDetails);
//       const attemptsCheck = await quizClient.checkAttempts(qid as string, currentUser?._id);
//       setCanAttempt(attemptsCheck.canAttempt);
//       setUserHasAttempted(attemptsCheck.attempts > 0);
//       if (fetchedQuizDetails.multipleAttempts) {
//         setAttemptsLeft(fetchedQuizDetails.attempts - attemptsCheck.attempts);
//       } else {
//         setAttemptsLeft(1 - attemptsCheck.attempts);
//       }
//       if (fetchedQuizDetails.timeLimit) {
//         setTimeLeft(fetchedQuizDetails.timeLimit);
//       }
//     } catch (error) {
//       console.error('Error fetching quiz details:', error);
//     }
//   };

//   const togglePublish = async () => {
//     if (!quiz) return;

//     const updatedQuiz = { ...quiz, published: !quiz.published }
//     try {
//       await client.updateQuiz(updatedQuiz);
//       dispatch(setQuizzes([updatedQuiz]));
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

  useEffect(() => {
    fetchQuiz();
  }, [cid, qid]);
//   );

//   const formatDateForInput = (dateString: string) => {
//     try {
//       const date = new Date(dateString);
//       const formattedDate = date.toISOString().slice(0, 16);
//       return formattedDate;
//     } catch (error) {
//       console.error('Error formatting date for input:', error);
//       return dateString;
//     }
//   };

//   const formatDate = (dateString: string) => {
//     try {
//       const date = new Date(dateString);
//       return format(date, "MMM d 'at' h a");
//     } catch (error) {
//       console.error('Error formatting date:', error);
//       return dateString;
//     }
//   };

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