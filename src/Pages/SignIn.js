import React, { useState } from 'react';
import api from '../services/api';
import { Container, Form, Input, Button, StyledLink, Title } from '../components/Form/index';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const user = { ...formData };

    try {
      const { data } = await api.login(user);
      login(data);
      navigate("/term");
    } catch (error) {
      let errorMessage = (String(error));
      console.log(errorMessage)
        if(errorMessage.includes(422)){
          return Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'O e-mail e a senha devem ter no mín 3 caracteres e o e-mail deve ser válido!',
          })
        } else if(errorMessage.includes(404)){
          return Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'O usuário não foi encontrado!',
          })
        }else if(errorMessage.includes(401)){
          return Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'E-mail ou senha incorretos!',
          })
        }
        ;
    }
  }

  return (
    <Container>
      <Title> RepoProvas </Title>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="E-mail"
          type="email"
          onChange={(e) => handleChange(e)}
          name="email"
          value={formData.email}
          required
        />
        <Input
          placeholder="Senha"
          type="password"
          onChange={(e) => handleChange(e)}
          name="password"
          value={formData.password}
          required
        />
        <Button type="submit">Entrar</Button>
      </Form>
      <StyledLink to="/sign-up">Primeira vez? Cadastre-se!</StyledLink>
    </Container>
  );
}