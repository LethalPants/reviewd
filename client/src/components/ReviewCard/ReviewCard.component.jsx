import React from 'react';
import './ReviewCard.styles.css';
import { Link } from 'react-router-dom';
import Container from '../Container/Container.component';
const ReviewCard = ({ review }) => {
  const rating = `${review.rating * 10}%`;
  const gradient =
    review.rating > 7.5
      ? 'linear-gradient(90deg, rgba(66,148,0,1) 0%, rgba(29,193,0,1) 35%, rgba(138,255,0,1) 100%)'
      : 'linear-gradient(to right, #f12711, #f5af19)';

  const imgBuffer =
    review && review.image
      ? `data:image/jpg;base64,${new Buffer(review.image.data).toString(
          'base64'
        )}`
      : null;
  return (
    <div
      className={`rc-dark-bg`}
      style={{
        backgroundImage: `url(${imgBuffer})`,
        backgroundBlendMode: 'soft-light',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <Container>
        <div className='rc-bottom'>
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
        <div className='rc-details'>
          <div className='rc-details-container'>
            <span>
              <span className='rc-dull'>Released At:</span> {review.releaseAt}
            </span>
            <br />
            <span>
              <span className='rc-dull'>Score:</span> {review.rating}
            </span>
            <Link className='rc-button' to={`/review/${review._id}`}>
              Read Review
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ReviewCard;
