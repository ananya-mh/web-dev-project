import { deleteAssignment } from "./reducer";

export default function DeleteAssignmentEditor({
  dialogTitle,
  assignmentName,
}: {
  dialogTitle: string;
  assignmentName: string;
}) {
  return (
    <div
      id="wd-delete-assignment-dialog"
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle}{" "}
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">Are you sure about deleting {assignmentName}?</div>
          <div className="modal-footer">
            <button
              onClick={deleteAssignment}
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-danger"
            >
              Yes{" "}
            </button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              No{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
