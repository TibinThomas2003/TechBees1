// components/Signup.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 600px;
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
  display: grid;
  gap: 15px;
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  grid-column: span 2;
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

const LinkText = styled.span`
  cursor: pointer;
  color: #007bff;
`;

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    address: '',
    pincode: '',
    landmark: '',
    phoneNumber: '',
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup Successful:', data.user);
        alert('Signup Successful:', data.user);
        // Redirect or perform any action on successful signup
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        console.error('Error during signup:', data.error);

        // Check if the error message indicates that the user already exists
        if (data.error.includes('User already exists')) {
          alert('User already exists. Please login or use a different email.');
        } else {
          alert('Check all credentials and try again:', data.error);
        }
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Error during signup:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSignup}>
        <GridSection>
          <div>
            <Label htmlFor="email">Email:</Label>
            <Input type="email" id="email" name="email" onChange={handleChange} required autoComplete="username" />

            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required
              autoComplete="new-password"
            />

            <Label htmlFor="confirmPassword">Confirm Password:</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          <div>
            <Label htmlFor="name">Name:</Label>
            <Input type="text" id="name" name="name" onChange={handleChange} required />

            <Label htmlFor="address">Address:</Label>
            <Input type="text" id="address" name="address" onChange={handleChange} required />

            <Label htmlFor="pincode">Pincode:</Label>
            <Input type="text" id="pincode" name="pincode" onChange={handleChange} required />

            <Label htmlFor="landmark">Landmark:</Label>
            <Input type="text" id="landmark" name="landmark" onChange={handleChange} required />

            <Label htmlFor="phoneNumber">Phone Number:</Label>
            <Input type="tel" id="phoneNumber" name="phoneNumber" onChange={handleChange} required />
          </div>
        </GridSection>

        <Button type="submit">Sign Up</Button>

        <Message>
          Already have an account? <LinkText as={Link} to="/login">Login here</LinkText>
        </Message>
      </Form>
    </Container>
  );
};

export default Signup;
