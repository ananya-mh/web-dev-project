import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });
const ASSIGNMENT_API = `${REMOTE_SERVER}/api/assignments`;
export const deleteAssignment = async (assignmentId) => {
 const response = await axiosWithCredentials.delete(`${ASSIGNMENT_API}/${assignmentId}`);
 return response.data;
};

export const updateAssignment = async (assignment) => {
    const { data } = await axiosWithCredentials.put(`${ASSIGNMENT_API}/${assignment._id}`, assignment);
    return data;
  };

//   export const updateModule = async (module) => {
//     const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
//     return data;
//   };
  