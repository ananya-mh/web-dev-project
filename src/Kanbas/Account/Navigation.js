import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state) => state.accountReducer);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div id="wd-account-navigation" className="list-group wd fs-5 rounded-0">
      {!currentUser && (
        <Link
          to="/Kanbas/Account/Signin"
          className={`list-group-item text-danger border border-0 ${isActive("/Kanbas/Account/Signin") ? "active" : ""}`}
        >
          Signin
        </Link>
      )}
      {!currentUser && (
        <Link
          to="/Kanbas/Account/Signup"
          className={`list-group-item text-danger border border-0 ${isActive("/Kanbas/Account/Signup") ? "active" : ""}`}
        >
          Signup
        </Link>
      )}
      {currentUser && (
        <Link
          to="/Kanbas/Account/Profile"
          className={`list-group-item text-danger border border-0 ${isActive("/Kanbas/Account/Profile") ? "active" : ""}`}
        >
          Profile
        </Link>
      )}
       {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kanbas/Account/Users`} className={`list-group-item ${isActive("Users")}`}> Users </Link> )}
    </div>
  );
}
