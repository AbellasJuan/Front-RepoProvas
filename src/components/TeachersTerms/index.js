import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #072227;
  width: 100%;
  min-height: 100vh;
  height: auto;
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

export {
    Container,
    PageTitle,
    Menu,
    StyledButton,
    TestsBox,
    Test,
};