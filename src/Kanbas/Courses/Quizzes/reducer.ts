import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  quizzes: [],
  quiz: {
    name: "",
    course: "",
    description: "",
    availableFrom: "",
    availableUntil: "",
    points: 0,
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      const newQuiz: any = [
        ...state.quizzes,
        {
          ...action.payload,
          _id: new Date().getTime().toString(),
        },
      ];
      state.quizzes = newQuiz;
      state.quiz = {
        name: "",
        course: "",
        description: "",
        availableFrom: "",
        availableUntil: "",
        points: 0,
      };
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter((a: any) => a._id !== action.payload);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quiz._id ? quiz : a
      ) as any;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
  },
});

export const {addQuiz, deleteQuiz, setQuiz, setQuizzes, updateQuiz } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
