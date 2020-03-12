import React from 'react';
import './homepage.styles.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const HomePage = ({ user }) => (
  <>
    {console.log(user)}
    {user ? <h1>Welcome, {user.username}</h1> : null}
    <Link to='/signup' className='Link'>
      Sign up
    </Link>
    <Link to='/signin' className='Link'>
      Sign in
    </Link>
  </>
);

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

export default connect(mapStateToProps)(HomePage);
