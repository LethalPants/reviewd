/*eslint no-useless-computed-key: "off"*/

import React, { useState } from 'react';
import axios from 'axios';
import './PostReview.styles.css';
import { withRouter } from 'react-router-dom';

import Header from '../../components/Header/Header.component';
import StepOne from '../../components/PostStepOne/PostStepOne.component';
import StepTwo from '../../components/PostStepTwo/PostStepTwo.component';

const SignIn = ({ history }) => {
  document.body.style = 'background: #fff; color : #333';
  const [review, setReview] = useState({
    name: '',
    body: '',
    genre: '',
    releaseAt: '',
    publisher: '',
    rating: ''
  });
  const [step, setStep] = useState(1);

  var formdata = new FormData();
  const [error, setError] = useState(false);
  const handleChange = event => {
    setError('');
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  const handleUpload = event => {
    formdata.append('gameImage', event.target.files[0]);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setStep(1);
    axios
      .post(
        '/api/reviews',
        {
          name: review.name,
          body: review.body,
          genre: review.genre,
          releaseAt: review.releaseAt,
          publisher: review.publisher,
          rating: review.rating
        },
        {
          headers: {
            ['Authorization']: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then(res => {
        axios
          .post(
            `http://localhost:80/api/reviews/image/?_id=${res.data.review._id}`,
            formdata,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          )
          .then(result => {
            setReview({
              name: '',
              body: '',
              genre: '',
              releaseAt: '',
              publisher: '',
              rating: ''
            });
            history.push('/');
          })
          .catch(error => console.log('error', error));
      })
      .catch(err => {
        console.log(err);
        setError(true);
      });
  };

  console.log(step);

  return (
    <>
      <Header className='header-white' />
      <div className='post-rev-container'>
        <div className='post-rev-form-container'>
          <h2 className='post-rev-align-left'>New Review</h2>
          <form onSubmit={handleSubmit}>
            <div className='post-rev-grid'>
              {step === 1 ? (
                <StepOne
                  error={error}
                  handleChange={handleChange}
                  handleUpload={handleUpload}
                  review={review}
                  setStep={setStep}
                />
              ) : (
                <StepTwo
                  review={review}
                  handleChange={handleChange}
                  setStep={setStep}
                  handleSubmit={handleSubmit}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default withRouter(SignIn);
