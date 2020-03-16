import React from 'react';
import ReviewCard from '../ReviewCard/ReviewCard.component';
import './CardGrid.styles.css';

const CardGrid = ({ reviews }) => {
  return (
    <div className='card-container'>
      <span className='card-title'>Recently Reviewed</span>
      <div className='card-grid'>
        {reviews
          ? reviews.map(review => (
              <ReviewCard review={review} key={review._id} />
            ))
          : null}
      </div>
    </div>
  );
};

export default CardGrid;
