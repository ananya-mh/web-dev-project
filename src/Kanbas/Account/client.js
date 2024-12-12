import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  console.log(response.data);
  return response.data;
};

export const createUser = async (user) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};


export const findUsersByRole = async (role) => {
  const response = await
    axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name) => {
  const response = await axios.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete( `${USERS_API}/${userId}` );
  return response.data;
};

export const findCoursesForUser = async (userId) => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}/${userId}/courses`
  );
  return response.data;
};



export const createCourse = async (course) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

export const signin = async (credentials) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};
export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};
export const signup = async (user) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const updateUser = async (user) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};


export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};


//ENROLL/UNENROLL FROM AND INTO COURSE  
export const enrollIntoCourse = async (userId, courseId) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};

export const unenrollFromCourse = async (userId, courseId) => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};