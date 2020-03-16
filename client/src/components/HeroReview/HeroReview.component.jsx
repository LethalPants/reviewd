import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../Button/Button.component';
import Pill from '../Pill/Pill.component';
import './HeroReveiew.style.css';
const HeroReview = ({ review, history }) => {
  const genreArray = review ? review.genre.split(',') : 0;

  const imgBuffer =
    review && review.image
      ? `data:image/jpg;base64,${new Buffer(review.image.data).toString(
          'base64'
        )}`
      : null;
  return review ? (
    <>
      <div
        className='hero-bg-dark'
        style={{
          backgroundImage: `url(${imgBuffer})`,
          backgroundBlendMode: 'soft-light',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <div className='hero-container'>
          <p className='hero-featured'>featured</p>
          <h1 className='hero-game-title'>{review.name}</h1>
          <div className='hero-hr'></div>
          <div className='hero-section-subtext'>
            <span className='hero-subtext'>
              <span className='tag'>Publisher: </span>
              {review.publisher}
            </span>
            <span className='hero-subtext'>
              <span className='tag'>Released on: </span> {review.releaseAt}
            </span>
            <div className='hero-subtext hero-genre-row'>
              {genreArray.map((item, index) => (
                <Pill key={index}>{item}</Pill>
              ))}
            </div>
          </div>
          <div className='hero-hr'></div>
          <Button
            className='hero-submit'
            onClick={() => history.push(`/review/${review._id}`)}
          >
            Read Review
          </Button>
        </div>
      </div>
    </>
  ) : null;
};

export default withRouter(HeroReview);
