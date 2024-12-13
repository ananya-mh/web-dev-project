import React from "react";
import Kanbas from "./Kanbas";
import QuizEditor from "./Kanbas/Courses/Quizzes/QuizEditor";
// import "./App.css";
import Labs from "./Labs";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Kanbas/store";

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Labs" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
          {/* <Route path="/QuizEditor/Questions" element={<QuizEditor/>} /> */}
        </Routes>
      </div>
      </Provider>
    </HashRouter>
  );
}

export default App;