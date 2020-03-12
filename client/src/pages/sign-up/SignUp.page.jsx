import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './signup.styles.css';
import FormInput from '../../components/FormInput/FormInput.component';
import Button from '../../components/Button/Button.component';
import { signUpSuccess } from '../../redux/user/user.actions';

const SignUp = ({ signUpSuccess, history }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [error, setError] = useState('');
  const validateEmail = email => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePass = pass => {
    return user.password === pass;
  };

  const handleChange = event => {
    setError('');
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    if (name === 'email') {
      if (value.length === 0) {
        setEmailError('Email is required!');
      } else if (!validateEmail(value)) {
        setEmailError('Please enter a valid Email Address');
      } else {
        setEmailError('');
      }
    } else if (
      name === 'confirmPassword' ||
      (name === 'password' && user.confirmPassword.length > 0)
    ) {
      if (!validatePass(value)) {
        setPassError('Passwords do not match');
      } else {
        setPassError('');
      }
    }
  };

  const handleSubmit = event => {
    const { username, email, password } = user;
    event.preventDefault();
    if (passError === '') {
      axios
        .post('/api/users/register', {
          username,
          email,
          password
        })
        .then(response => {
          console.log('Response', response);
          localStorage.setItem('token', response.data.token);
          signUpSuccess(response.data.user);
          history.push('/');
        })
        .catch(err => {
          if (err.response.status === 400) {
            console.log(err.response.data.errmsg);
            setError(err.response.data.err.errmsg);
          }
        });
    }
  };
  return (
    <div className='container'>
      <div className='form-container'>
        <h2 className='align-left'>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className='grid'>
            <div className='grid-item'>
              <FormInput
                name='username'
                label='Username'
                type='text'
                required
                handleChange={handleChange}
              />
              {error && error.includes('username') ? (
                <span className='error-text'>{error}</span>
              ) : null}
            </div>
            <div className='grid-item'>
              <FormInput
                name='email'
                label='Email'
                type='text'
                required
                handleChange={handleChange}
                noValidate
              />
              {emailError ? (
                <span className='error-text'>{emailError}</span>
              ) : null}
              {error && error.includes('email') ? (
                <span className='error-text'>{error}</span>
              ) : null}
            </div>
            <div className='grid-item'>
              <FormInput
                name='password'
                label='Password'
                type='password'
                required
                handleChange={handleChange}
              />
            </div>
            <div className='grid-item'>
              <FormInput
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                required
                handleChange={handleChange}
              />
              {passError ? (
                <span className='error-text'>{passError}</span>
              ) : null}
            </div>

            <div className='grid-item'>
              <Button type='submit' className='red-submit'>
                Register
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signUpSuccess: user => dispatch(signUpSuccess(user))
});

export default connect(null, mapDispatchToProps)(withRouter(SignUp));
