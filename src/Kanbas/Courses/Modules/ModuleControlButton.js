import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckMark from "./GreenCheckMark";
import { BsPlusLg } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function ModuleControlButtons({ moduleId, deleteModule,editModule}) {
  return (
    <div className="float-end">
      <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>
      <GreenCheckMark />
      <BsPlusLg />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}