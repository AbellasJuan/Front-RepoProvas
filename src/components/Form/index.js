import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: ${(props) => props.alignSelf || 'initial'};
  background-color: #072227;
  min-height: 100vh;
  min-width: 100vw;
`;

const Title = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 40px;
  font-weight: 400;
  line-height: 50px;
  text-align: center;
  color: #FFFFFF;
  margin-bottom: 50px;
`

const Form = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 32px;
`;

const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  color: #000;
  background: #FFFFFF;
  padding: 15px 16px;
  border-radius: 15px;
  font-family: Arial, Helvetica, sans-serif;
  ::placeholder {
    color: #000;
  }
`;

const Button = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
  color: #FFFFFF;
  padding: 12px;
  background: #35858B;
  border-radius: 15px;
  margin-top: 20px;
  transition-duration: 600ms;
    
    :hover{
      transition-duration: 600ms;
      transform: scale(1.02); 
    }
`;

const StyledLink = styled(Link)`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  color: #FFF;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
`;

export {
  Container,
  Form,
  Input,
  Button,
  StyledLink,
  Title
}