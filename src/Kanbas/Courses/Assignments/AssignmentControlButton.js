import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";

export default function AssignmentControlButtons() {
  return (
    <div>
      <span
        className="border border-black fs-6 p-2 text-black me-2"
        style={{ borderRadius: "50px" }}
      >
        40% of Total
      </span>
      <BsPlusLg />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}