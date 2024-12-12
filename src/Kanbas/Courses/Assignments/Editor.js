import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer"; // Adjust the import path
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.accountReducer);
  const isFaculty = userRole?.currentUser?.role === "FACULTY";

  const assignments = useSelector((state) => state.assignmentReducer.assignments);

  const handleAddAssignment = async () => {
    if (!cid) return;
    const newAssignment = { ...formData, course: cid };

    try {
      const assignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
      console.log(assignment);
      dispatch(addAssignment(assignment));
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

  // Check if editing an existing assignment
  let existingAssignment = assignments.find((assignment) => assignment._id === aid) || null;
  // Initialize formData
  const [formData, setFormData] = useState({
    title: existingAssignment ? existingAssignment.title : "",
    submissionType: existingAssignment ? existingAssignment.submissionType : "Online",
    due: existingAssignment ? existingAssignment.due : "",
    notAvailableUntil: existingAssignment ? existingAssignment.notAvailableUntil : "",
    description: existingAssignment ? existingAssignment.description : "",
    points: existingAssignment ? existingAssignment.points : 0,
    assignmentGroup: existingAssignment ? existingAssignment.assignmentGroup : "ASSIGNMENTS",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Reset formData when `aid` changes or if there's no existingAssignment match
  useEffect(() => {
    if (existingAssignment) {
      setFormData(existingAssignment); // Load existing assignment data
    } else {
      setFormData({
        title: "",
        due: "",
        notAvailableUntil: "",
        description: "",
        points: 0,
        assignmentGroup: "ASSIGNMENTS",
        submissionType: "Online",
      });
    }
  }, [existingAssignment, aid, assignments.length]);


  const saveAssignment = async (assignment) => {
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };
  // Handle save action
  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.points || !formData.due) {
      alert("Please fill in all required fields.");
      return;
    }

    if (existingAssignment) {
      await saveAssignment({ ...formData, editing: false });;
    } else {
      // If adding new, dispatch addAssignment
      await handleAddAssignment();
    }

    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <b>
        <label htmlFor="title">Assignment Name</label>
      </b>
      <br />
      <input
        id="title"
        value={formData.title}
        className="form-control mb-3"
        onChange={handleChange}
        required
        disabled={!isFaculty}
      />

      <div className="form-group mb-3">
        <p style={{ color: "red", fontWeight: "bold" }}>This assignment is available online</p>
        <textarea
          id="description"
          cols={30}
          rows={10}
          className="form-control"
          style={{ borderColor: "lightgray" }}
          value={formData.description}
          onChange={handleChange}
          required
          disabled={!isFaculty}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="points"><b>Points</b></label>
        <input
          id="points"
          type="number"
          value={formData.points}
          className="form-control mb-3"
          onChange={handleChange}
          required
          disabled={!isFaculty}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="assignmentGroup"><b>Assignment Group</b></label>
        <select
          id="assignmentGroup"
          className="form-control"
          value={formData.assignmentGroup}
          onChange={handleChange}
        >
          <option value="ASSIGNMENTS">Assignments</option>
          <option value="QUIZZES">Quizzes</option>
          <option value="PROJECTS">Projects</option>
          <option value="DISCUSSIONS">Discussions</option>
        </select>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <label htmlFor="submissionType"><b>Submission Type</b></label>
          <select
            id="submissionType"
            className="form-control mb-3"
            value={formData.submissionType}
            onChange={handleChange}
            disabled={!isFaculty}
          >
            <option value="Online">Online</option>
            <option value="In Person">On Paper</option>
          </select>

          {formData.submissionType === "Online" && (
            <div>
              <h6 className="card-title">Online Entry Options</h6>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="textEntry"
                  defaultChecked
                  disabled={!isFaculty}
                />
                <label className="form-check-label" htmlFor="textEntry">
                  Text Entry
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="websiteURL"
                  disabled={!isFaculty}
                />
                <label className="form-check-label" htmlFor="websiteURL">
                  Website URL
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="mediaRecordings"
                  disabled={!isFaculty}
                />
                <label className="form-check-label" htmlFor="mediaRecordings">
                  Media Recordings
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="fileUpload"
                  disabled={!isFaculty}
                />
                <label className="form-check-label" htmlFor="fileUpload">
                  File Uploads
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="due"><b>Due</b></label>
          <input
            type="date"
            id="due"
            value={formData.due || ''}
            className="form-control"
            onChange={handleChange}
            required
            disabled={!isFaculty}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="notAvailableUntil"><b>Available Until</b></label>
          <input
            type="date"
            id="notAvailableUntil"
            value={formData.notAvailableUntil || ''}
            className="form-control"
            onChange={handleChange}
            disabled={!isFaculty}
          />
        </div>
      </div>

      <hr />

      {isFaculty && <div className="d-flex justify-content-end">
        <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
          <button type="button" className="btn btn-secondary me-2">Cancel</button>
        </Link>
        <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
      </div>}
    </div>
  );
}