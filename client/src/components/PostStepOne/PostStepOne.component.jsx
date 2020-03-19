import React from 'react';
import FormInput from '../FormInput/FormInput.component';

import './StepOne.styles.css';
const StepOne = ({ review, handleChange, handleUpload, setStep, error }) => (
  <>
    <div className='post-rev-post-rev-grid-item'>
      {error ? (
        <span className='error-text'>
          Unable to post review. Something went wrong!
        </span>
      ) : null}
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
    <div className='post-rev-grid-item'>
      <input
        type='file'
        name='gameReview'
        id='gameReview'
        className='hidden'
        onChange={handleUpload}
      />
      <label htmlFor='gameReview'>
        <i className='material-icons'>camera_alt</i>
      </label>
    </div>

    <div className='post-rev-grid-item'>
      <span className='post-rev-submit' onClick={() => setStep(2)}>
        Next
      </span>
    </div>
  </>
);

export default StepOne;
