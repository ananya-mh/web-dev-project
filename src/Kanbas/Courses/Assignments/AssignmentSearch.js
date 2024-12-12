import { BsPlusLg } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import IndividualAssignment from "./IndividualAssignment";
import { setAssignments,addAssignment } from "./reducer";
import * as coursesClient from "../client";
import { useDispatch } from "react-redux";

export default function AssignmentSearch() {
  const { currentUser } = useSelector((state) => state.accountReducer); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cid } = useParams();

  const handleAddAssignment = () => {
    // Navigate to the AssignmentEditor without an aid
    navigate(`/Kanbas/Courses/${cid}/Assignments/new`);
  };



  return (
    <div className="d-flex justify-content-between">
      <div
        className="input-group border border-1 rounded"
        style={{ maxWidth: "300px" }}
      >
        <span className="input-group-text bg-white border-0">
          <CiSearch />
        </span>
        <input
          id="wd-search-assignment"
          className="form-control border-0"
          placeholder="Search..."
          style={{ backgroundColor: "white" }}
        />
      </div>
      <div className="float-end">
        {/* Show Assignment and Group buttons only for faculty */}
        {currentUser.role === "FACULTY" && (
          <>
            <button
              id="wd-add-assignment"
              className="btn btn-secondary btn-outline-secondary me-1"
            >
              <BsPlusLg
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Group
            </button>
            <button 
              id="wd-add-assignment-group" 
              className="btn btn-danger me-1" 
              onClick={handleAddAssignment} // Attach click handler
            >
              <BsPlusLg
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Assignment
            </button>
          </>
        )}
      </div>
    </div>
  );
}
