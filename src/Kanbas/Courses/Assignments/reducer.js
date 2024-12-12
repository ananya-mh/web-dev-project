import { createSlice } from "@reduxjs/toolkit";
import * as coursesClient from "../client";

const initialState = {
  assignments: [], // Initial assignments from assignments.json
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },

    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = {
        _id: new Date().getTime().toString(),
        title: assignment.title,
        description: assignment.description,
        course: assignment.course,
        notAvailableUntil: assignment.notAvailableUntil,
        due: assignment.due,
        points: assignment.points,
        submissionType: assignment.submissionType,
        assignmentGroup: assignment.assignmentGroup,
      };
      state.assignments = [...state.assignments, newAssignment];
    },
  
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignment._id ? assignment : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment,setAssignments } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
