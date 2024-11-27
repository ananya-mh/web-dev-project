import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";

// import * as db from "./Database";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import { useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import CourseProtectedRoute from "./Courses/ProtectedRoute";
import { enrollCourse } from "./EnrollmentReducer";
import { useDispatch, useSelector } from "react-redux";
import Session from "./Account/Session";
export default function Kanbas() {
  const dispatch = useDispatch();
  // const [courses, setCourses] = useState<any[]>(db.courses);
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
      console.log("Setting courses index", courses);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };

  const updateCourse = async () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
    await courseClient.updateCourse(course);
  };

  const deleteCourse = async (courseId: string) => {
    console.log(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
    const status = await courseClient.deleteCourse(courseId);
  };

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="Courses/:cid/*"
              element={
                <CourseProtectedRoute>
                  <Courses courses={courses} />
                </CourseProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
