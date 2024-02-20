import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, like sending the data to a server
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const styles = {
    contactContainer: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f4f4f4',
      borderRadius: '8px',
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    },
    contactHeading: {
      textAlign: 'center',
      color: '#333',
      fontSize: '28px',
      marginBottom: '30px',
      textTransform: 'uppercase',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      color: '#555',
      fontSize: '16px',
    },
    inputField: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    messageField: {
      height: '100px',
    },
    submitBtn: {
      display: 'block',
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '18px',
      transition: 'background-color 0.3s ease',
    },
    socialMediaIcons: {
      textAlign: 'center',
      marginTop: '20px',
    },
    iconLink: {
      margin: '0 10px',
      fontSize: '24px',
      color: '#007bff', // Change color if needed
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    }
  };

  return (
    <div style={styles.contactContainer}>
      <h2 style={styles.contactHeading}>Get in Touch</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.inputField}
            placeholder="Enter your name"
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.inputField}
            placeholder="Enter your email"
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="message" style={styles.label}>Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            style={{ ...styles.inputField, ...styles.messageField }}
            placeholder="Enter your message"
          />
        </div>
        <button type="submit" style={styles.submitBtn}>Send Message</button>
      </form>
      <div style={styles.socialMediaIcons}>
        <a
          href="https://www.linkedin.com/"
          style={styles.iconLink}
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a
          href="https://twitter.com/"
          style={styles.iconLink}
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a
          href="https://www.facebook.com/"
          style={styles.iconLink}
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
    </div>
  );
};
