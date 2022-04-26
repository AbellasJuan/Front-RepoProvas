import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACK_URL;

async function getTestsByTeacher(teacherId){
  const tests = await axios.get(`${BASE_URL}tests/teacher/${teacherId}`);
  return tests;
};

async function getTestsByTerm(termId){
  const tests = await axios.get(`${BASE_URL}tests/term/${termId}`);
  return tests;
};

const api ={
	getTestsByTeacher,
  getTestsByTerm
}

export default api;