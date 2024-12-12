import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const USERS_API = `${REMOTE_SERVER}/api/users`;

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
 };
 
 export const createCourse = async (course) => {
 const { data } = await axiosWithCredentials.post(COURSES_API, course);
 return data;
};

export const findCoursesForEnrolledUser = async (userId) => {
  const { data } = await axios.get(`${USERS_API}/${userId}/courses`);
  return data;
}

export const deleteCourse = async (courseId) => {
    const response = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}`);
    return response.status; // Ensure you're returning the status for validation
  }

export const updateCourse = async (course) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

//Modules
export const findModulesForCourse = async (courseId) => {
  const response = await axiosWithCredentials
    .get(`${COURSES_API}/${courseId}/modules`);
  console.log(response.data);
  return response.data;
};

export const createModuleForCourse = async (courseId, module) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
}

//Assignments
export const findAssignmentsForCourse= async (courseId) => {
  const response = await axiosWithCredentials
    .get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};



export const createAssignmentForCourse = async (courseId, assignment) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
}


export const fetchQuizzesForCourse = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};







