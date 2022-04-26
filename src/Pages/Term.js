import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import api from '../services/api';


export default function Term(){

  const [tests, setTests] = useState([]);
  
  function renderTests(termId){
    const promise = api.getTestsByTerm(termId);
    promise.then((res) => {
        setTests(res.data)
        
    })
      .catch((err) => console.log(err));
  }

  console.log(tests)
    
  useEffect(renderTests, [tests, setTests])

    return (
        <Container>
          
          <PageTitle>
            <h1>PROVAS POR PERÍODO</h1>
          </PageTitle>
          <Menu>
            <StyledButton onClick={() => renderTests(1)}>PROVAS DO 1º PERIODO</StyledButton>
            <StyledButton onClick={() => renderTests(2)}>PROVAS DO 2º PERIODO</StyledButton>
            <StyledButton onClick={() => renderTests(3)}>PROVAS DO 3º PERIODO</StyledButton>
            <StyledButton onClick={() => renderTests(4)}>PROVAS DO 4º PERIODO</StyledButton>
            <StyledButton onClick={() => renderTests(5)}>PROVAS DO 5º PERIODO</StyledButton>
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
                <p>Período: {test.teacherDiscipline.discipline.term.number}</p>
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
  display: flex;
  justify-content: center;
  align-items: center;

  h1{
    font-family: Arial, Helvetica, sans-serif;
    margin: 30px 0 30px 0;
    font-size: 2.5em;
    color: #AEFEFF;
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
  border-radius: 22px;
  margin: 20px 0 10px 0;
  background-color: #35858B;
  text-align: center;
  color:  #AEFEFF;

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