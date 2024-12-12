import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/enrollments`;
export const fetchUsers = async (courseId) => {
 const response = await axiosWithCredentials.get(`${MODULES_API}/${courseId}`);
 return response.data;
};
