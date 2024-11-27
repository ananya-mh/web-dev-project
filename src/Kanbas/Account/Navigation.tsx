import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {!currentUser && (
        <>
          <NavLink
            to="/Kanbas/Account/Signin"
            id="wd-account-signin-link"
            className={({ isActive }) =>
              isActive
                ? "list-group-item border border-0 active text-black"
                : "list-group-item border text-danger border-0"
            }
          >
            Signin
          </NavLink>

          <NavLink
            to="/Kanbas/Account/Signup"
            id="wd-account-signup-link"
            className={({ isActive }) =>
              isActive
                ? "list-group-item border border-0 active text-black"
                : "list-group-item border text-danger border-0"
            }
          >
            Signup
          </NavLink>
        </>
      )}

      {currentUser && (
        <NavLink
          to="/Kanbas/Account/Profile"
          id="wd-account-profile-link"
          className={({ isActive }) =>
            isActive
              ? "list-group-item border border-0 active text-black"
              : "list-group-item border text-danger border-0"
          }
        >
          Profile
        </NavLink>
      )}
    </div>
  );
}
