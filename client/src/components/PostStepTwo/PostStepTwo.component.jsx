import React from 'react';
import TextArea from '../TextArea/TextArea.component';
const StepTwo = ({ review, handleChange, setStep, handleSubmit }) => (
  <>
    <div className='post-rev-grid-item span-2'>
      <TextArea name='body' label='Review Body' handleChange={handleChange}>
        {review.body}
      </TextArea>
    </div>

    <div className='post-rev-grid-item'>
      <span className='post-rev-submit' onClick={() => setStep(1)}>
        Previous
      </span>

      <span className='post-rev-submit' type='submit' onClick={handleSubmit}>
        Submit
      </span>
    </div>
  </>
);

export default StepTwo;
