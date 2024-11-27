import { Link } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { unenrollCourse, enrollCourse } from "./EnrollmentReducer";
import axios from "axios";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const dispatch = useDispatch();
  const isStudent = currentUser?.role === "STUDENT";
  const [allCourses, setAllCourses] = useState([]);
  const [displayCourses, setDisplayCourses] = useState(false);
  const [coursesMap, setCoursesMap] = useState(courses);
  const [loading, setLoading] = useState(false);

  const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
  const COURSES_API = `${REMOTE_SERVER}/api/courses`;
  const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(COURSES_API);
      setAllCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setAllCourses([]);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [courses]); // Add courses as dependency to refresh when courses change

  const isEnrolled = (courseId: any) => {
    return enrollments.some(
      (enrollment: any) => enrollment.course === courseId && enrollment.user === currentUser?._id
    );
  };

  useEffect(() => {
    console.log("Fetch courses", coursesMap);

    if (isStudent) {
      if (displayCourses) {
        setCoursesMap(allCourses);
      } else {
        const enrolledCourses = allCourses.filter((course: any) => isEnrolled(course._id));
        setCoursesMap(enrolledCourses);
      }
    } else {
      setCoursesMap(courses);
    }
  }, [displayCourses, enrollments, allCourses, courses, isStudent]);

  const handleEnrollments = () => {
    setDisplayCourses(!displayCourses);
  };

  const handleEnroll = async (e: React.MouseEvent, courseId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      const enrollment = {
        user: currentUser._id,
        course: courseId,
      };

      const response = await axios.post(`${ENROLLMENTS_API}/create`, enrollment);
      dispatch(enrollCourse(response.data));
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("Failed to enroll in course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnenroll = async (e: React.MouseEvent, courseId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      const enrollment = enrollments.find(
        (e: any) => e.course === courseId && e.user === currentUser._id
      );

      if (!enrollment) {
        console.error("Enrollment not found");
        return;
      }

      await axios.delete(`${ENROLLMENTS_API}/${enrollment._id}`);
      dispatch(unenrollCourse({ user: currentUser._id, course: courseId }));
    } catch (error) {
      console.error("Error unenrolling from course:", error);
      alert("Failed to unenroll from course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!course.name || !course.description) {
      alert("Please fill in both name and description");
      return;
    }
    addNewCourse();
    setCourse({
      _id: "0",
      name: "",
      description: "",
    });
  };

  const handleUpdateCourse = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!course.name || !course.description) {
      alert("Please fill in both name and description");
      return;
    }
    updateCourse();
    setCourse({
      _id: "0",
      name: "",
      description: "",
    });
  };

  const handleDeleteCourse = (e: React.MouseEvent, courseId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteCourse(courseId);
    }
  };

  const handleEditCourse = (e: React.MouseEvent, courseToEdit: any) => {
    e.preventDefault();
    e.stopPropagation();
    setCourse(courseToEdit);
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {!isStudent && (
        <div>
          <h5>
            {course._id === "0" ? "New Course" : "Edit Course"}
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleAddCourse}
              disabled={course._id !== "0"}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={handleUpdateCourse}
              id="wd-update-course-click"
              disabled={course._id === "0"}
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            placeholder="Course Name"
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            placeholder="Course Description"
            className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </div>
      )}
      {isStudent && (
        <div className="d-flex justify-content-end w-100">
          <button onClick={handleEnrollments} className="btn btn-primary" disabled={loading}>
            {displayCourses ? "Show My Courses" : "Show All Courses"}
          </button>
        </div>
      )}
      <h2 id="wd-dashboard-published">
        {isStudent ? (
          displayCourses ? (
            <>All Courses ({coursesMap.length})</>
          ) : (
            <>Enrolled Courses ({coursesMap.length})</>
          )
        ) : (
          <>Published Courses ({coursesMap.length})</>
        )}
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {coursesMap.map((courseItem: any) => (
            <div
              key={courseItem._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                <Link
                  to={`/Kanbas/Courses/${courseItem._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img src="/images/reactjs.png" width="100%" height={160} alt="course" />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">{courseItem.name}</h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {courseItem.description}
                    </p>
                    <button className="btn btn-primary">Go</button>
                    {!isStudent && (
                      <>
                        <button
                          onClick={(e) => handleDeleteCourse(e, courseItem._id)}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(e) => handleEditCourse(e, courseItem)}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
                    {isStudent && (
                      <>
                        {isEnrolled(courseItem._id) ? (
                          <button
                            id="wd-edit-course-unenroll"
                            onClick={(e) => handleUnenroll(e, courseItem._id)}
                            className="btn btn-danger me-2 float-end"
                            disabled={loading}
                          >
                            {loading ? "Processing..." : "Unenroll"}
                          </button>
                        ) : (
                          <button
                            id="wd-edit-course-enroll"
                            onClick={(e) => handleEnroll(e, courseItem._id)}
                            className="btn btn-success me-2 float-end"
                            disabled={loading}
                          >
                            {loading ? "Processing..." : "Enroll"}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
