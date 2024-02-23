import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Components/Assets/logo.png';

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 1px 1px 5px #007bff,-1px -1px 5px #007bff;
  text-align: center;
`;

const Title = styled.h2`
  color: #007bff;
  margin : 5%;
  margin-bottom: 10%;
  letter-spacing: 2px;
  font-weight: 400;
  text-shadow: 1px 2px 4px #bbb;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center; /* Align items (input fields and button) at the center horizontally */
`;
 

const Input = styled.input`
width: 100%;
  padding: 15px;   
  border: none;
  background: #F4F4F4; 
  font-size: 14px;
  border-radius: 10px;
  box-shadow: inset 1px 2px 4px #ccc;
`;

const Button = styled.button`
  width: 50%;
  padding: 10px; 
  font-size: 18px;
  color: #fff;
  letter-spacing :2px;
  background: #007bff; 
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 1px 2px 4px #999,-1px -1px 5px #999; 
  transition:   .2s ease;

  &:hover {  
    transform: scale(0.9);
    color: #fff; 
    background-color: #999; 
    box-shadow: 1px 2px 4px #444,-1px -1px 5px #000; 
  }
`;

const Message = styled.div`
  font-size: 14px;
`;

const Image = styled.img`
  max-width: 30%;
  height: auto;
  border-radius: 50%;
  border: 4px solid #007bff;
  margin-bottom: 20px;
  box-shadow: 1px 2px 4px #007bff,-1px -2px 4px #007bff;
  transition : .5s ease;
  &:hover { 
    cursor: pointer;
    transform : scale(0.95);
    filter: invert();
  }
`;

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login Successful:', data.user);
        alert('Login Successful : Welcome To TechBees', data.user);

        localStorage.setItem('userSession', JSON.stringify(data.user));
        setIsLoggedIn(true);

        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('secretKey', 'techbees');

        localStorage.setItem('userEmail', formData.email);

        const isAdmin = formData.email === 'admin@gmail.com' && formData.password === 'tibin@2003';

        navigate(isAdmin ? '/admindashboard' : '/home');
        window.location.reload();
      } else {
        console.error('Error during login:', data.error);
        alert('Check email and password and try again:', data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Image src={logo} alt="Logo" />
      <Title>LogIn Here !</Title>
      <Form onSubmit={handleLogin}> 
        <Input type="email" id="email" placeholder="Enter Your Email ID..." name="email" onChange={handleChange} required /> 
        <Input type="password" id="password" placeholder="Enter Your Password..." name="password" onChange={handleChange} required />
        <Button type="submit">Login</Button>
        <Message>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </Message>
      </Form>
    </Container>
  );
};

export default Login;
