import React from 'react';
import './ReviewCard.styles.css';
import Container from '../Container/Container.component';
const ReviewCard = ({ review }) => {
  const rating = `${review.rating * 10}%`;
  const gradient =
    review.rating > 7.5
      ? 'linear-gradient(to right, #24fe41, #fdfc47)'
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
        <div className='bottom'>
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
      </Container>
    </div>
  );
};

export default ReviewCard;
