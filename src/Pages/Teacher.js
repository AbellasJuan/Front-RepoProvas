import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from '../services/api';
import Swal from 'sweetalert2';
import { Container, Menu, PageTitle, StyledButton, Test, TestsBox } from '../components/TeachersTerms/index.js';


export default function Term(){
  const [tests, setTests] = useState(null);
  const [teachers, setTeachers] = useState([]);

  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = auth;

  async function renderTests(teacherId){
    try{
      const result = await api.getTestsByTeacher(token, teacherId);
      setTests(result.data)
          
    }catch (error) {
      let errorMessage = (String(error));
      console.log(errorMessage)
        if(errorMessage.includes(409)){
          return Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'O usuário não foi encontrado!',
          })
        }else if(errorMessage.includes(500)){
          return Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'Tente logar novamente!',
          })
        }
        
    }
  };

  useEffect( () =>{ async function renderTeachers(){
        try{
        const result = await api.getTeachers(token);
        setTeachers(result.data)
          
        }catch (error) {
          let errorMessage = (String(error));
          console.log(errorMessage)
            if(errorMessage.includes(409)){
              return Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'O usuário não foi encontrado!',
              });
            }else if(errorMessage.includes(500)){
              return Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'Tente logar novamente!',
              });
            };
        
          };
  };
      // eslint-disable-next-line
   renderTeachers();} , [])

    return (
        <Container>
          
          <PageTitle>
            <h1>PROVAS POR PROFESSOR</h1>
            <StyledButton onClick={()=>navigate('/term')}>Ver provas por PERÍODO</StyledButton>
          </PageTitle>
          <Menu>
            {teachers.map((teacher, index) =>
              <StyledButton key={index} onClick={() => renderTests(`${teacher.id}`)}>{teacher.name}</StyledButton>
            )}
          </Menu>
          {tests === null && <Test>SELECIONE O PROFESSOR DESEJADO</Test>}
          {
          tests?.length === 0 ? <Test>NÃO HÁ PROVAS DESSE PROFESSOR</Test> :

          tests?.map((test, index) => 

            <TestsBox key={index}>
              <Test>
                <p>{test.category.name}</p>
                <p>Tema: {test.name}</p> 
                <p><a href={`${test.pdfUrl}`}> LINK DA PROVA </a></p>
                <p>Disciplina: {test.teacherDiscipline.discipline.name}</p>
                <p>Período: {test.teacherDiscipline.discipline.term.number}</p>
                <p>Ano: {test.year}</p>
                <p>Professor: {test.teacherDiscipline.teacher.name}</p>
              </Test>
            </TestsBox>
          )}
        </Container>
    );
};