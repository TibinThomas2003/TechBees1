import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #007bff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
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

        // Set user session in localStorage
        localStorage.setItem('userSession', JSON.stringify(data.user));
        setIsLoggedIn(true);

        // Store token and secret key in session storage
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('secretKey', 'techbees');

        // Store email in local storage
        localStorage.setItem('userEmail', formData.email);

        // Check if the credentials match admin credentials
        const isAdmin = formData.email === 'admin@gmail.com' && formData.password === 'tibin@2003';

        // Redirect to admin dashboard if admin, else redirect to home page
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
      <Title>Login</Title>
      <Form onSubmit={handleLogin}>
        <Label htmlFor="email">Email ID:</Label>
        <Input type="email" id="email" name="email" onChange={handleChange} required />

        <Label htmlFor="password">Password:</Label>
        <Input type="password" id="password" name="password" onChange={handleChange} required />

        <Button type="submit">Login</Button>

        <Message>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </Message>
      </Form>
    </Container>
  );
};

export default Login;
