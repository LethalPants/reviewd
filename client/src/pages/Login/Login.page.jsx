import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import WhiteHeader from '../../components/HeaderWhite/HeaderWhite.component';
import Container from '../../components/Container/Container.component';
import './Login.styles.css';
import FormInput from '../../components/FormInput/FormInput.component';
import Button from '../../components/Button/Button.component';
import { signInSuccess } from '../../redux/user/user.actions';

const SignIn = ({ signInSuccess, history }) => {
  document.body.style = 'background : #fff; color : #333';
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = event => {
    setError('');
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = event => {
    const { username, password } = user;
    event.preventDefault();
    axios
      .post('/api/users/login', {
        username,
        password
      })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        setUser({
          username: '',
          password: ''
        });
        setError('');
        signInSuccess(response.data.user);
        history.push('/');
      })
      .catch(err => {
        setError('Incorrect Username or password');
      });
  };
  return (
    <div className='reg-grid'>
      <WhiteHeader />
      <div className='form-container'>
        <Container>
          <h2 className='align-left'>Log In</h2>
          {error ? <span className='error-text'>{error}</span> : null}
          <form onSubmit={handleSubmit}>
            <div className='grid'>
              <div className='grid-item'>
                <FormInput
                  name='username'
                  label='Username or Email'
                  value={user.username}
                  type='text'
                  required
                  handleChange={handleChange}
                />
              </div>
              <div className='grid-item'>
                <FormInput
                  name='password'
                  label='Password'
                  value={user.password}
                  type='password'
                  required
                  handleChange={handleChange}
                />
              </div>

              <div className='grid-item'>
                <Button type='submit' className='red-submit'>
                  Log In
                </Button>
              </div>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signInSuccess: user => dispatch(signInSuccess(user))
});

export default connect(null, mapDispatchToProps)(withRouter(SignIn));
