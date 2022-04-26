import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACK_URL;

function createConfig(token) {
  return {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }
}

async function getTestsByTeacher(token, teacherId){
  const tests = await axios.get(`${BASE_URL}tests/teacher/${teacherId}`, createConfig(token));
  return tests;
};

async function getTestsByTerm(token, termId){
  const tests = await axios.get(`${BASE_URL}tests/term/${termId}`, createConfig(token));
  return tests;
};

async function createUser(user) {
  await axios.post(`${BASE_URL}auth/sign-up`, user);
}

async function login(data) {
  const token = await axios.post(`${BASE_URL}auth/sign-in`, data);
  return token;
}

async function getTerms(token){
  const terms = await axios.get(`${BASE_URL}terms`, createConfig(token));
  return terms;
};

async function getTeachers(token){
  const teachers = await axios.get(`${BASE_URL}teachers`, createConfig(token));
  return teachers;
};

const api ={
	getTestsByTeacher,
  getTestsByTerm,
  createUser,
  login,
  getTerms,
  getTeachers
}

export default api;