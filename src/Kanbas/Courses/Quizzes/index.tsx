import React, { useState, useEffect } from "react";
import "./index.css";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import QuizControlButtons from "./LessonControlButtons";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { RxRocket } from "react-icons/rx";
import DescControlButtons from "./LessonControlButtons";
import QuizControls from "./QuizControls";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz, deleteQuiz, setQuizzes } from "./reducer";
import * as quizClient from "./client";
import * as coursesClient from "../client";
import GreenCheckmark from "./GreenCheckmark";
export default function Quizzes() {
  const { cid } = useParams();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  console.log(currentUser.role);
  const disabled = currentUser.role !== "FACULTY";
  const intialQuiz = {
    name: "Quiz 1",
    description: "",
    published: "false",
    course: 932490543,
    type: "Graded",
    points: "100",
    assignmentGroup: "QUIZZES",
    shuffleAnswers: false,
    timeLimit: 20,
    multipleAttempts: false,
    attemptChance: 1,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "date",
    availableFrom: "date",
    availableUntil: "date",
    isTemporary: true,
    questions: []
  };
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  const fetchAllQuizzes = async () => {
    const modules = await coursesClient.fetchQuizzesForCourse(cid as string);
    dispatch(setQuizzes(modules));
  };
  useEffect(() => {
    fetchAllQuizzes();
  }, []);

  const removeQuiz = async (quizId: string) => {
    await quizClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  return (
    <div className="me-4">
      <QuizControls setQuiz={() => dispatch(setQuiz(intialQuiz))} />
      <br />
      <br />
      <br />
      <br />
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Assignment Quizzes
            <QuizControlButtons />
            {/* <span className="float-end border boder-dark rounded p-1">40% of Total</span> */}
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {quizzes.map((quiz: any) => (
              <li className="wd-lesson list-group-item p-3 ps-1">
                <div className="position-absolute top-50 start-0 translate-middle-y">
                  <BsGripVertical className="me-2 fs-3" />
                  <RxRocket className="me-2 fs-3" color="green" />
                </div>
                <div className="position-absolute top-50 start-50 translate-middle w-75">
                  <Link
                    className="wd-assignment-link text-black link-underline link-underline-opacity-0"
                    to={`./${quiz._id}`}
                    onClick={() => dispatch(setQuiz(quiz))}
                  >
                    {quiz.name}
                  </Link>
                  <p>
                    <text className="text-danger">Multiple Modules</text> |{" "}
                    <b>Not Available until</b> {quiz.availableFrom.split("T")[0]} at{" "}
                    {quiz.availableFrom.split("T")[1]} | <b>Due</b> {quiz.availableUntil.split("T")[0]} at{" "}
                    {quiz.availableUntil.split("T")[1]} | {quiz.points} pts
                  </p>
                </div>
                {quiz.completed && !disabled && (
                  <div className="position-absolute top-50 end-0 translate-middle-y">
                    <FaCheckCircle
                      style={{ color: "#00940a" }}
                      className="me-2"
                      onClick={(e) => {
                        e.preventDefault();
                        const confirmDelete = window.confirm(
                          "Are you sure you want to delete this assignment?"
                        );
                        if (confirmDelete) {
                          removeQuiz(quiz._id);
                        }
                      }}
                    />
                  </div>
                )}
                <br />
                <br />
                <br />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
