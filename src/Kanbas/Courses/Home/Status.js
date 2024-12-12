import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { IoMdHome, IoIosNotifications } from "react-icons/io";
import { RiBarChart2Fill } from "react-icons/ri";
import { TfiAnnouncement } from "react-icons/tfi";
import { useSelector } from "react-redux";

export default function CourseStatus() {
  const { currentUser } = useSelector((state) => state.accountReducer);
  
  // Determine if the user is a faculty
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      {isFaculty ? (
        <>
          <div className="d-flex">
            <div className="w-50 pe-1">
              <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
                <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
              </button>
            </div>
            <div className="w-50">
              <button className="btn btn-lg btn-success w-100">
                <FaCheckCircle className="me-2 fs-5" /> Publish
              </button>
            </div>
          </div>
          <br />
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <BiImport className="me-2 fs-5" />
            Import Existing Content
          </button>
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <LiaFileImportSolid className="me-2 fs-5" />
            Import from Commons
          </button>
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <IoMdHome className="me-2 fs-5" />
            Choose Home Page
          </button>
          <br />
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <RiBarChart2Fill className="me-2 fs-5" />
            New Analytics
          </button>
          <br />
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <RiBarChart2Fill className="me-2 fs-5" />
            View Course Screen
          </button>
          <br />
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <TfiAnnouncement className="me-2 fs-5" />
            View Announcement
          </button>
          <br />
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <IoIosNotifications className="me-2 fs-5" />
            View Course Notifications
          </button>
        </>
      ) : (
        <>
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <RiBarChart2Fill className="me-2 fs-5" />
            View Course Screen
          </button>
          <br />
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <TfiAnnouncement className="me-2 fs-5" />
            View Announcement
          </button>
          <br />
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <IoIosNotifications className="me-2 fs-5" />
            View Course Notifications
          </button>
        </>
      )}
    </div>
  );
}
