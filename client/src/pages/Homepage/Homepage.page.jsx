/*eslint no-useless-computed-key: "off"*/
import React from 'react';
import './homepage.styles.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ReviewDirectory from '../../components/ReviewDirectory/ReviewDirectory.component';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutSuccess } from '../../redux/user/user.actions';
import axios from 'axios';

const HomePage = ({ user, logout }) => {
  const handleLogout = () => {
    axios({
      method: 'POST',
      url: '/api/users/logout',
      headers: { ['Authorization']: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        logout();
        localStorage.clear();
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <>
      {user ? <h1>Welcome, {user.username}</h1> : null}

      {user ? (
        <h2 onClick={handleLogout} className='Link'>
          Logout
        </h2>
      ) : (
        <>
          <Link to='/signup' className='Link'>
            Sign up
          </Link>
          <Link to='/signin' className='Link'>
            Sign in
          </Link>
        </>
      )}

      {user && user.type === 'editor' ? (
        <Link to='/review/new' className='Link'>
          Post Review
        </Link>
      ) : null}

      <ReviewDirectory />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(signOutSuccess())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
