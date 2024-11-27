import { Link, NavLink } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
// import { courses } from "../Database";
export default function CoursesNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();
  // const courses = courses.find((course) => course._id === cid);
  // console.log(cid);
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0 d-none d-md-block">
      {links.map((link) => (
        <NavLink
          to={`/Kanbas/Courses/${cid}/${link}`}
          id={`wd-course-${link}-link`}
          className={({ isActive }) =>
            isActive
              ? "list-group-item border border-0 active text-black"
              : "list-group-item border text-danger border-0"
          }
        >
          {link}
        </NavLink>
      ))}
    </div>
  );
}
