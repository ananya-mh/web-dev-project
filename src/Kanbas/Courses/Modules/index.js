import { useParams } from "react-router";
import { setModules,addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButton";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButton";
import * as coursesClient from "../client";
import * as modulesClient from "./client";


export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const [moduleId, setModuleId] = useState("");
  const { modules } = useSelector((state) => state.modulesReducer);
  const { currentUser } = useSelector((state) => state.accountReducer); // Access currentUser for role-based control
  const dispatch = useDispatch();
  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, [moduleId]);


  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    console.log(module);
    setModuleId(module._id);
    dispatch(addModule(module));
  };

  const removeModule = async (moduleId) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const saveModule = async (module) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };


  return (
    <div>
      {/* Show ModulesControls only for faculty */}
        <ModulesControls
          setModuleName={setModuleName}
          moduleName={moduleName}
          addModule={createModuleForCourse}
        />

      <br /><br />
      <div className="wd-modules-container">
        <ul id="wd-modules" className="list-group rounded-0">
          {modules.map((module) => (
              <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name}
                  {module.editing && currentUser.role === "FACULTY" && (
                    <input
                      className="form-control w-50 d-inline-block"
                      onChange={(e) =>
                        dispatch(updateModule({ ...module, name: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                             saveModule({ ...module, editing: false });
                        }
                      }}
                      defaultValue={module.name}
                    />
                  )}
                  {/* Show ModuleControlButtons only for faculty */}
                  {currentUser.role === "FACULTY" && (
                    <ModuleControlButtons
                      moduleId={module._id}
                      deleteModule={(moduleId) => removeModule(moduleId)}
                      editModule={(moduleId) => dispatch(editModule(moduleId))}
                    />
                  )}
                </div>
                {module.lessons && (
                  <ul className="wd-lessons list-group rounded-0">
                    {module.lessons.map((lesson) => (
                      <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                        {/* Show LessonControlButtons only for faculty */}
                        {currentUser.role === "FACULTY" && <LessonControlButtons />}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
