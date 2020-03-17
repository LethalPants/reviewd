import React from 'react';
import './homepage.styles.css';
import Header from '../../components/Header/Header.component';
import ReviewDirectory from '../../components/ReviewDirectory/ReviewDirectory.component';

const HomePage = () => {
  document.body.style = 'background: #14141; color : #fff';

  return (
    <>
      <Header />
      <ReviewDirectory />
    </>
  );
};
export default HomePage;
