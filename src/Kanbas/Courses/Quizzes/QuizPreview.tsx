import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as quizService from './client';

interface Question {
  questionText: string;
  _id: string;
  text: string;
  points: number;
  type: 'multiple-choice' | 'fill-in-the-blanks' | 'true-false';
  options?: string[];
  answers: string[];
}

interface Answers {
  [key: number]: string;
}

interface Quiz {
  name: string;
}

export default function QuizPreview() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const [answers, setAnswers] = useState<Answers>({});
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const loadQuizInfo = async () => {
      const quiz = await quizService.findQuizByQuizId(qid as string);
      setCurrentQuiz(quiz);
      setQuestions(quiz.questions);
  };

  useEffect(() => {
    loadQuizInfo();
  }, []);

  const handleAnswerUpdate = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  return (
    <div className='container mt-5'>
      <h3>{currentQuiz?.name}</h3>
            {currentUser?.role !== 'STUDENT' && (
              <div className='alert alert-info' role='alert'>
                This is a preview of the published version of the quiz.
              </div>
            )}
            <h3>Quiz Instructions</h3>
            <hr />
            { questions.length > 0 && (
              <div
                key={questionIndex}
                className="card mb-3"
                style={{borderRadius: 0}}
              >
                <div className='card-header d-flex justify-content-between'>
                  <h4>Question {questionIndex + 1}</h4>
                  <span>{questions[questionIndex].points} pts</span>
                </div>
                <div className='card-body'>
                  <p>{questions[questionIndex].questionText}</p>
                  {questions[questionIndex].type === 'multiple-choice' && (
                    <div className='list-group'>
                      {questions[questionIndex].options?.map((option) => (
                        <>
                        <hr />
                        <label
                          key={option}
                          className='list-group-item d-flex align-items-center'
                          style={{border: 0, padding: 0}}
                        >
                          <input
                            type='radio'
                            name={`question-${questionIndex}`}
                            value={option}
                            checked={answers[questionIndex] === option}
                            onChange={() => handleAnswerUpdate(questionIndex, option)}
                            className='me-2'
                          />
                          {option}
                        </label>
                        </>
                      ))}
                    </div>
                  )}
                  {questions[questionIndex].type === 'true-false' && (
                    <div className='list-group'>
                    <hr />
                      <label className='list-group-item d-flex align-items-center'
                                                style={{border: 0, padding: 0}}
                      >
                        <input
                          type='radio'
                          name={`question-${questionIndex}`}
                          value='true'
                          checked={answers[questionIndex] === 'true'}
                          onChange={() => handleAnswerUpdate(questionIndex, 'true')}
                          className='me-2'
                        />
                        True
                      </label>
                      <hr />
                      <label className='list-group-item d-flex align-items-center'
                                                style={{border: 0, padding: 0}}>
                        <input
                          type='radio'
                          name={`question-${questionIndex}`}
                          value='false'
                          checked={answers[questionIndex] === 'false'}
                          onChange={() => handleAnswerUpdate(questionIndex, 'false')}
                          className='me-2'
                        />
                        False
                      </label>
                    </div>
                  )}
                  {questions[questionIndex].type === 'fill-in-the-blanks' && (
                    <div className='mb-3'>
                        <input
                          key={questionIndex}
                          type='text'
                          className='form-control my-2'
                          value={answers[questionIndex]}
                          onChange={(e) =>
                            handleAnswerUpdate(questionIndex, e.target.value)
                          }
                        />
                    </div>
                  )}
                </div>
              </div>
            )}
            <button
                onClick={()=>setQuestionIndex(questionIndex - 1)}
                disabled={questionIndex===0}
                className='btn btn-secondary'
            >
                Previous
            </button>
            <button
                onClick={()=>setQuestionIndex(questionIndex + 1)}
                disabled={questionIndex===questions.length - 1}
                style={{float: "right"}}
                className='btn btn-secondary'
            >
                Next
            </button>
    </div>
  );
}