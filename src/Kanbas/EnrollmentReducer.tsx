import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";

const initialState = {
  enrollments: enrollments,
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (state, { payload: enrollment }) => {
      const newEnrollment = {
        _id: new Date().getTime().toString(),
        user: enrollment.user,
        course: enrollment.course,
      };

      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },

    unenrollCourse: (state, { payload: enrollment }) => {
      state.enrollments = state.enrollments.filter(
        (e) => e.course !== enrollment.course || e.user !== enrollment.user
      );
    },
  },
});

export const { enrollCourse, unenrollCourse } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
