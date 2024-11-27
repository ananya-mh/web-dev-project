import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <span className="rounded-pill border border-light text-dark p-2 me-2">40% of Total</span>
      <FaPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
