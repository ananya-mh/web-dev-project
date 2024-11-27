import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const isEnrolled = enrollments.some(
    (enrollment: any) => enrollment.user === currentUser?._id && enrollment.course === cid
  );

  if (!isEnrolled) {
    return <Navigate to="/Kanbas/Dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
