import Profile from "./Profile";
import Signin from "./Signin";
import { useSelector } from "react-redux";
import Signup from "./Signup";
import { Routes, Route, Navigate } from "react-router";
import AccountNavigation from "./Navigation";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div className="">
      <h2>Account</h2>
      <table>
        <tbody>
          <tr>
            <td valign="top" className="pe-5 ps-3">
              <AccountNavigation />
            </td>
            <td valign="top" className="ps-5">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Navigate
                      to={currentUser ? "/Kanbas/Account/Profile" : "/Kanbas/Account/Signin"}
                    />
                  }
                />
                <Route path="/Signin" element={<Signin />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Signup" element={<Signup />} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
