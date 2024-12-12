import { useParams, useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
//import * as db from "../../Database";
import { addQuiz, setQuiz, setQuizzes, updateQuiz } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as quizClient from "./client";

export default function QuizEditor() {
  const { qid } = useParams();
  const { cid } = useParams();
  //const assignment = db.assignments;
  const { quiz } = useSelector((state: any) => state.assignmentReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const disabled = currentUser.role !== "FACULTY";
  const handleSave = async () => {
    if (qid === "new") {
      await quizClient.createQuiz(cid,quiz);
      dispatch(
        addQuiz({
          ...quiz,
        })
      );
    } else {
      await quizClient.updateQuiz(quiz);
      dispatch(
        updateQuiz({
          ...quiz,
        })
      );
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };
  return (
    <div id="wd-assignments-editor" className="me-4">
      <div>
        <label htmlFor="wd-name" className="mb-2">
          <b>Quiz Name</b>
        </label>
        <input
          disabled={disabled}
          id="wd-name"
          defaultValue={quiz.title}
          className="form-control mb-4"
          onChange={(e) => dispatch(setQuiz({ ...quiz, title: e.target.value }))}
        />
        <textarea
          disabled={disabled}
          id="wd-description"
          className="form-control mb-4"
          onChange={(e) => dispatch(setQuiz({ ...quiz, description: e.target.value }))}
        >
          {quiz.description}
        </textarea>
        <div className="row">
          <label htmlFor="wd-points" className="col">
            <span className="float-end me-2">Points</span>
          </label>
          <input
            disabled={disabled}
            id="wd-points"
            defaultValue={quiz.points}
            className="form-control mb-3 col"
            onChange={(e) => dispatch(setQuiz({ ...quiz, points: e.target.value }))}
          />
        </div>
        <div className="row">
          <label htmlFor="wd-group" className="col">
            <span className="float-end me-2">Quiz Group</span>
          </label>
          <select
            disabled={disabled}
            id="wd-group"
            name="Assignment Groups"
            className="form-select mb-3 col"
          >
            <option value="option1">QUIZZES</option>
          </select>
        </div>
        <div className="row">
          <label htmlFor="wd-display-grade-as" className="col">
            <span className="float-end me-2">Display Grade as</span>
          </label>
          <select
            disabled={disabled}
            id="wd-display-grade-as"
            name="Display grade as"
            className="form-select mb-3 col"
          >
            <option value="option1">Percentage</option>
            <option value="option2">Letter</option>
          </select>
        </div>
        <div className="row">
          <label htmlFor="wd-submission-type" className="col">
            <span className="float-end me-2">Submission type</span>
          </label>
          <div className="border border-secondary rounded p-3 mb-3 col">
            <select
              disabled={disabled}
              id="wd-submission-type"
              name="submission type"
              className="form-select mb-3"
            >
              <option value="option1">Online</option>
              <option value="option2">In person</option>
            </select>

            <label className="mb-2">
              <b>Online Entry Options</b>
            </label>
            <br />

            <input
              disabled={disabled}
              type="checkbox"
              name="check-genre"
              id="wd-text-entry"
              className="form-check-input me-2"
            />
            <label htmlFor="wd-text-entry" className="form-check-label mb-2">
              Text Entry
            </label>
            <br />

            <input
              disabled={disabled}
              type="checkbox"
              name="check-genre"
              id="wd-website-url"
              className="form-check-input me-2"
            />
            <label htmlFor="wd-webiste-url" className="form-check-label mb-2">
              Website URL
            </label>
            <br />

            <input
              disabled={disabled}
              type="checkbox"
              name="check-genre"
              id="wd-media-recordings"
              className="form-check-input me-2"
            />
            <label htmlFor="wd-media-recordings" className="form-check-label mb-2">
              Media Recordings
            </label>
            <br />

            <input
              disabled={disabled}
              type="checkbox"
              name="check-genre"
              id="wd-student-annotation"
              className="form-check-input me-2"
            />
            <label htmlFor="wd-student-annotation" className="form-check-label mb-2">
              Student Annotation
            </label>
            <br />

            <input
              disabled={disabled}
              type="checkbox"
              name="check-genre"
              id="wd-file-upload"
              className="form-check-input me-2"
            />
            <label htmlFor="wd-file-upload" className="form-check-label mb-2">
              File Uploads
            </label>
          </div>
        </div>
        <div className="row">
          <label htmlFor="wd-assign-to" className="col">
            <span className="float-end me-2">Assign</span>
          </label>
          <div className="border border-secondary rounded p-3 mb-3 col">
            <label htmlFor="wd-assign-to">
              <b>Assign to</b>
            </label>
            <br />
            <input
              disabled={disabled}
              id="wd-assign-to"
              value="Everyone"
              className="form-control mb-2"
            />

            <label htmlFor="wd-due-date">
              <b>Due</b>
            </label>
            <br />
            <input
              disabled={disabled}
              type="datetime-local"
              id="wd-due-date"
              defaultValue={quiz.due}
              onChange={(e) => dispatch(setQuiz({ ...quiz, due: e.target.value }))}
              className="form-control mb-2"
            />

            <div className="row">
              <div className="col">
                <label htmlFor="wd-available-from">
                  <b>Available From</b>
                </label>
                <input
                  disabled={disabled}
                  type="datetime-local"
                  id="wd-available-from"
                  defaultValue={quiz.unlock}
                  className="form-control mb-2"
                  onChange={(e) =>
                    dispatch(setQuiz({ ...quiz, unlock: e.target.value }))
                  }
                />
              </div>
              <div className="col">
                <label htmlFor="wd-available-until">
                  <b>Until</b>
                </label>
                <input
                  disabled={disabled}
                  type="datetime-local"
                  id="wd-available-until"
                  defaultValue={quiz.due}
                  className="form-control mb-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {!disabled && (
        <>
          <button onClick={handleSave} className="btn btn-lg btn-danger me-1 float-end">
            Save
          </button>
          <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
            <button className="btn btn-lg btn-secondary me-1 float-end">Cancel</button>
          </Link>
        </>
      )}
    </div>
  );
}
