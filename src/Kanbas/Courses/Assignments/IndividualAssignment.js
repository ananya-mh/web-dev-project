import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckMark from "../Modules/GreenCheckMark";
import { deleteAssignment } from "./reducer";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import * as assignmentClient from "./client";

export default function LessonControlButtons({ assignmentId }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    await assignmentClient.deleteAssignment(assignmentId); 
    dispatch(deleteAssignment(assignmentId)); // Dispatch deleteAssignment with the ID
    setShowModal(false); // Close the modal after deletion
  };

  // const removeModule = async (moduleId) => {
  //   await modulesClient.deleteModule(moduleId);
  //   dispatch(deleteModule(moduleId));
  // };

  return (
    <div className="float-end">
      <GreenCheckMark />
      <FaTrash 
        className="text-danger ms-3 fs-4 me-2 mb-1" 
        onClick={() => setShowModal(true)} // Open modal on click
      />
      <IoEllipsisVertical className="fs-4" />

      {/* Bootstrap Modal for Confirmation */}
      <div 
        className={`modal ${showModal ? "show" : ""}`} 
        style={{ display: showModal ? "block" : "none" }} // Control modal display
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this assignment?</p>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for Modal */}
      {showModal && <div className="modal-backdrop fade show" />}
    </div>
  );
}
