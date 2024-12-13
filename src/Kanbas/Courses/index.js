
import { Navigate, Route, Routes,useLocation } from "react-router";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useParams } from "react-router";
import CoursePeople from "./People/CoursePeople";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizPreview from './Quizzes/QuizPreview';

export default function Courses({ courses }) {
  const { pathname } = useLocation();
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid); 
  
  return (
    <div id="wd-courses">
      <h2 className="text-danger"> {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <FaAlignJustify className="me-4 fs-4 mb-1" />
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation cid={cid}/>
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h2>Piazza</h2>} />
            <Route path="Zoom" element={<h2>Zoom</h2>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid" element={<QuizDetails />} />
            <Route path="Quizzes/:qid/questions/" element={<QuizPreview />} />
            <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="People" element={<CoursePeople/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}