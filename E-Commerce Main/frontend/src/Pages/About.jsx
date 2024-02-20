import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>About Our E-Commerce Platform</h2>
      <p style={styles.paragraph}>
        Welcome to our E-Commerce platform! We are dedicated to providing our customers with a seamless shopping experience and a wide range of high-quality products.
      </p>
      <p style={styles.paragraph}>
        Our platform was founded in [year] with the mission of revolutionizing the online shopping experience. We strive to offer the latest trends, best deals, and exceptional customer service to our valued customers.
      </p>
      <p style={styles.paragraph}>
        At our E-Commerce platform, you'll find everything you need - from electronics and fashion to home decor and beauty products. We work tirelessly to curate a diverse selection of products that cater to every taste and preference.
      </p>
      <p style={styles.paragraph}>
        Thank you for choosing our platform for your online shopping needs. We look forward to serving you and exceeding your expectations!
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '28px',
    marginBottom: '20px',
    textTransform: 'uppercase',
  },
  paragraph: {
    marginBottom: '15px',
    lineHeight: '1.6',
  },
};

export default About;
