import React, { useState } from 'react';
import api from '../../src/services/api.js';
import { useNavigate } from 'react-router';
import {Container, Form, Input, Button, StyledLink, Title } from '../../src/components/Form/index.js';
import Swal from 'sweetalert2';

export default function SignUp(){

    const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
    });
    
    const navigate = useNavigate();

    function handleChange({ target }) {
        setFormData({ ...formData, [target.name]: target.value });
    }


    async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: 'As senhas não coincidem!'
    })
    }

    const user = { ...formData };
    delete user.confirmPassword;

    try {
      await api.createUser(user);
      Swal.fire({
        icon:'success',
        title: 'Sucesso!',
        text: 'O usuário foi cadastrado'
      })
      navigate('/');
    } catch (error) {
      let errorMessage = (String(error));
        if(errorMessage.includes(422)){
          return Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'O usuário e a senha devem ter no mín 3 caracteres e o e-mail deve ser válido!',
          })
        } else if(errorMessage.includes(409)){
          return Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'O usuário já existe!',
          })
        }
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
        <Input
          placeholder="Repita sua senha"
          type="password"
          onChange={(e) => handleChange(e)}
          name="confirmPassword"
          value={formData.confirmPassword}
          required
        />
        <Button type="submit">Cadastrar</Button>
            </Form>
            <StyledLink to="/">Já tem uma conta? Entre agora!</StyledLink>
        </Container>
    )
}