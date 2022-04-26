import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from '../services/api';
import Swal from 'sweetalert2';
import { Container, Menu, PageTitle, StyledButton, Test, TestsBox } from '../components/TeachersTerms/index.js';


export default function Term(){

  const [tests, setTests] = useState(null);
  const [terms, setTerms] = useState(null);

  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = auth;

  async function renderTests(termId){
    try{
      const result = await api.getTestsByTerm(token, termId);
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

  useEffect( () =>{ async function renderTerms(){
      try{
        const result = await api.getTerms(token);
        setTerms(result.data)
          
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
          } 
        
      }
      }
 // eslint-disable-next-line
   renderTerms();} , [])

    return (

      terms === null ? 

        <Container>
          <PageTitle>
            <h1>Carregando...</h1>
          </PageTitle>
        </Container> 
        
        : 

        <Container>
          <PageTitle>
            <h1>PROVAS POR PERÍODO</h1>
            <StyledButton onClick={()=>navigate('/teacher')}>Ver provas por PROFESSOR</StyledButton>
          </PageTitle>

          <Menu>
            {terms.map((term, index) =>
              <StyledButton key={index} onClick={() => renderTests(`${term?.id}`)}>{term?.number}° PERÍODO</StyledButton>
            )}
          </Menu>
          {tests === null && <Test>SELECIONE O PERÍODO DESEJADO</Test>}
          {
          tests?.length === 0 ? <Test>NÃO HÁ PROVAS DESSE PERÍODO</Test> :

          tests?.map((test, index) => 

            <TestsBox key={index}>
              <Test>
                <p>{test?.category.name}</p>
                <p>Tema: {test?.name}</p> 
                <p><a href={`${test?.pdfUrl}`}> LINK DA PROVA </a></p>
                <p>Disciplina: {test?.teacherDiscipline.discipline.name}</p>
                <p>Período: {test?.teacherDiscipline.discipline.term.number}°</p>
                <p>Ano: {test?.year}</p>
                <p>Professor: {test?.teacherDiscipline.teacher.name}</p>
              </Test>
            </TestsBox>
          )}
        </Container>
    );
};