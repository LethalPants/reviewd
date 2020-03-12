import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './signin.styles.css';
import FormInput from '../../components/FormInput/FormInput.component';
import Button from '../../components/Button/Button.component';
import { signInSuccess } from '../../redux/user/user.actions';

const SignIn = ({ signInSuccess, history }) => {
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
        console.log(response);
        localStorage.setItem('token', response.data.token);
        signInSuccess(response.data.user);
        setUser({
          username: '',
          password: ''
        });
        setError('');
        history.push('/');
      })
      .catch(err => {
        if (err.status === 400) {
          setError('Incorrect Username or password');
        }
      });
  };
  return (
    <div className='container'>
      <div className='form-container'>
        <h2 className='align-left'>Sign In</h2>
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
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signInSuccess: user => dispatch(signInSuccess(user))
});

export default connect(null, mapDispatchToProps)(withRouter(SignIn));
