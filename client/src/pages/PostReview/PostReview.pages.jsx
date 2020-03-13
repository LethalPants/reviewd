/*eslint no-useless-computed-key: "off"*/

import React, { useState } from 'react';
import axios from 'axios';
import './PostReview.styles.css';
import { withRouter } from 'react-router-dom';
import FormInput from '../../components/FormInput/FormInput.component';
import Button from '../../components/Button/Button.component';
import TextArea from '../../components/TextArea/TextArea.component';

const SignIn = ({ history }) => {
  const [review, setReview] = useState({
    name: '',
    body: '',
    genre: '',
    releaseAt: '',
    publisher: '',
    rating: ''
  });
  const [error, setError] = useState(false);
  const handleChange = event => {
    setError('');
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
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
      .catch(err => {
        console.log(err.response);
        setError(true);
      });
  };
  return (
    <div className='post-rev-container'>
      {error ? (
        <span className='error-text'>
          Unable to post review. Something went wrong!
        </span>
      ) : null}
      <div className='post-rev-form-container'>
        <h2 className='post-rev-align-left'>New Review</h2>
        {error ? <span className='post-rev-error-text'>{error}</span> : null}
        <form onSubmit={handleSubmit}>
          <div className='post-rev-grid'>
            <div className='post-rev-post-rev-grid-item'>
              <FormInput
                name='name'
                label='Game Title'
                value={review.name}
                type='text'
                required
                handleChange={handleChange}
              />
            </div>

            <div className='post-rev-grid-item'>
              <FormInput
                name='genre'
                label='Genre'
                value={review.genre}
                type='text'
                required
                handleChange={handleChange}
              />
            </div>

            <div className='post-rev-grid-item'>
              <FormInput
                name='releaseAt'
                label='Release Date'
                value={review.releaseAt}
                type='text'
                required
                handleChange={handleChange}
              />
            </div>

            <div className='post-rev-grid-item'>
              <FormInput
                name='publisher'
                label='Publisher'
                value={review.publisher}
                type='text'
                required
                handleChange={handleChange}
              />
            </div>

            <div className='post-rev-grid-item'>
              <FormInput
                name='rating'
                label='Score'
                value={review.rating}
                type='text'
                required
                handleChange={handleChange}
              />
            </div>

            <div className='post-rev-grid-item span-2'>
              <TextArea
                name='body'
                label='Review Body'
                handleChange={handleChange}
              >
                {review.body}
              </TextArea>
            </div>

            <div className='post-rev-grid-item'>
              <Button type='submit' className='red-submit'>
                Submit Review
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignIn);
