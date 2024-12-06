import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
export default function QuizControls({ setQuiz: setQuiz }: { setQuiz: () => void }) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const disabled = currentUser.role !== "FACULTY";

  return (
    <>
      <input
        id="wd-search-assignment"
        className="form-control float-start w-50"
        type="search"
        placeholder="&#128269; Search"
      />
      {!disabled && (
        <div id="wd-modules-controls" className="text-nowrap">
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/new`}>
            <button
              id="wd-add-assignment"
              className="btn btn-lg btn-danger me-1 float-end"
              onClick={setQuiz}
            >
              <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Quiz
            </button>
          </Link>
          <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary me-1 float-end">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </button>
        </div>
      )}
    </>
  );
}
