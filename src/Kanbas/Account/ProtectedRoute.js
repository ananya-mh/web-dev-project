import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function ProtectedRoute({ children }) {
  const { cid } = useParams();  // Get course ID from URL
  const { currentUser } = useSelector((state) => state.accountReducer);  // Get current user from Redux state
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const checkEnrollment = async () => {
      // If no current user, stop checking enrollment
      if (!currentUser) {
        setIsLoading(false);
        return;
      }

      // If there's no course ID, assume the user has access
      if (!cid) {
        setIsEnrolled(true); // Allow access if no course ID
        setIsLoading(false);
        return;
      }

      // If user role is not "STUDENT", allow access to the course regardless of enrollment
      if (currentUser.role !== "STUDENT") {
        setIsEnrolled(true); // Allow access if the user is not a student
        setIsLoading(false);
        return;
      }

      // Check if the user is enrolled in the course
      try {
        const response = await axios.get(
          `${REMOTE_SERVER}/api/users/${currentUser._id}/courses`,
          { withCredentials: true }
        );
        
        // Check if the course is in the user's enrolled courses
        const isUserEnrolled = response.data.some((enrollment) => enrollment._id === cid);
        setIsEnrolled(isUserEnrolled);
      } catch (error) {
        console.error("Error checking enrollment:", error);
        setIsEnrolled(false);
      }
      setIsLoading(false);
    };

    checkEnrollment();
  }, [currentUser, cid]);  // Run this effect when currentUser or cid changes

  // If no current user, redirect to login page
  if (!currentUser) {
    return <Navigate to="/Kanbas/Account/Signin" />;
  }

  // While checking enrollment, show loading message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If the user is a "STUDENT" but not enrolled in the course, redirect to the dashboard
  if (cid && currentUser.role === "STUDENT" && !isEnrolled) {
    return <Navigate to="/Kanbas/Dashboard" />;
  }

  // If everything is fine, render the protected content
  return children;
}