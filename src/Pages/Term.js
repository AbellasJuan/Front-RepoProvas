import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import useAuth from '../hooks/useAuth';
import api from '../services/api';
import Swal from 'sweetalert2';


export default function Term(){

  const [tests, setTests] = useState([]);
  const [terms, setTerms] = useState([]);

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
        <Container>
          
          <PageTitle>
            <h1>PROVAS POR PERÍODO</h1>
            <StyledButton onClick={()=>navigate('/teacher')}>Ver provas por PROFESSOR</StyledButton>
          </PageTitle>

          <Menu>
            {terms.map((term, index) =>
              <StyledButton key={index} onClick={() => renderTests(`${term.id}`)}>{term.number}° PERÍODO</StyledButton>
            )}
          </Menu>
          {
          tests?.length === 0 ? <Test>NÃO HÁ PROVAS DESSE PERÍODO</Test> :

          tests?.map((test, index) => 

            <TestsBox key={index}>
              <Test>
                <p>{test.category.name}</p>
                <p>{test.name}</p> 
                <p><a href={`${test.pdfUrl}`}> LINK DA PROVA </a></p>
                <p>Disciplina: {test.teacherDiscipline.discipline.name}</p>
                <p>Período: {test.teacherDiscipline.discipline.term.number}°</p>
                <p>Ano: {test.year}</p>
                <p>Professor: {test.teacherDiscipline.teacher.name}</p>
              </Test>
            </TestsBox>
          )}
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #072227;
  width: 100vw;
  height: 100vh;
`
const PageTitle = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  h1{
    font-family: Arial, Helvetica, sans-serif;
    margin: 30px 0 30px 0;
    font-size: 2em;
    color: #AEFEFF;
  }

  button{
    width: auto;
    font-size: 15px;
    margin-left: 20px;
  }
`

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
  height: 4em;
  background-color: #35858B;
  border: 2px solid #AEFEFF;
  border-radius: 15px;
  color:#AEFEFF;

  :hover{
    cursor: pointer;
  }
`

const TestsBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  position: relative;
`

const Test = styled.div`
  width: 30em;
  padding: 15px;
  border: 2px solid #AEFEFF;
  border-radius: 15px;
  margin: 20px 0 10px 0;
  background-color: #35858B;
  text-align: center;
  color:  #AEFEFF;
  font-family: Arial, Helvetica, sans-serif;

  p:first-child { 
    font-weight: 700;
    font-size: 1.5em;
    color: #4FBDBA;
  }

  p, a{
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 5px;
    text-align: start;
    color: #AEFEFF;
  }
`