import { Routes, Route, Navigate } from "react-router";
import { useState } from "react";
import Account from "./Account";
import Session from "./Account/Session";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import * as courseClient from "./Courses/client";
import { Provider } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import * as userClient from "./Account/client";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Kanbas() {
  const initialCourseState = {
    _id: "1234",
    name: "",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "",
    img: "reactjs.jpg",
  };
  const [courses, setCourses] = useState([]);
  const { currentUser } = useSelector((state) => state.accountReducer);

  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setEnrolling(false);
    }
  }, [currentUser]);

  
  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      console.log(courses)
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
console.log("Enrolled courses", enrolledCourses)
console.log("ALL courses", allCourses)

      const courses = allCourses.map((course) => {
        if (enrolledCourses.find((c) =>   c && course && c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const [course, setCourse] = useState({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
    img: "reactjs.jpg",
  });
  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
    await userClient.enrollIntoCourse(currentUser._id, newCourse._id);
  };
  const deleteCourse = async (courseId) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) =>  course && course._id !== courseId));
  };
  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
    setCourse(initialCourseState);
  };

  const updateEnrollment = async (courseId, enrolled) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
  };

  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute courses={courses}>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                // <ProtectedRoute courses={courses}>
                  <Courses courses={courses} />
                // </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
