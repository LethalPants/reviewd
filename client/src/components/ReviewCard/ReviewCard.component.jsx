import React from 'react';
import './ReviewCard.styles.css';

const ReviewCard = ({ review, index }) => {
  const genreArray = index === 0 ? review.genre.split(',') : 0;

  return (
    <div className={`rc-dark-bg`}>
      <h1 className={`rc-title`}>{review.name}</h1>
      <h3 className={`rc-rating`}>{review.rating}</h3>
      <div>
        {index === 0
          ? genreArray.map((item, index) => (
              <div className='float' key={index}>
                {item}
              </div>
            ))
          : null}
      </div>
      <span>{review.author.username}</span>
    </div>
  );
};

export default ReviewCard;
