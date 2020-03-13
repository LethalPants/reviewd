import React from 'react';
import './ReviewCard.styles.css';

const ReviewCard = ({ review }) => {
  const rating = `${review.rating * 10}%`;
  const gradient =
    review.rating > 7.5
      ? 'linear-gradient(90deg, rgba(43,139,4,1) 0%, rgba(183,255,33,1) 100%)'
      : 'linear-gradient(90deg, rgba(250,43,2,1) 0%, rgba(255,238,33,1) 100%);';
  return (
    <div className={`rc-dark-bg`}>
      <h1 className='rc-title'>{review.name}</h1>
      <div className='rc-meter'>
        <span
          style={{
            width: rating,
            backgroundImage: gradient
          }}
        ></span>
      </div>
    </div>
  );
};

export default ReviewCard;