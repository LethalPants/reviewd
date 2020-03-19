import React from 'react';
import axios from 'axios';
import Markdown from 'markdown-to-jsx';
import Pill from '../../components/Pill/Pill.component';
import Header from '../../components/Header/Header.component';

import './review.styles.css';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: ''
    };
    console.log(props.match);
    axios.get(`/api/reviews/${props.match.params.id}`).then(res => {
      this.setState({
        review: res.data
      });
    });
  }

  render() {
    const { review } = this.state;
    const genreArray = review ? review.genre.split(',') : 0;
    const imgBuffer =
      review && review.image
        ? `data:image/jpg;base64,${new Buffer(review.image.data).toString(
            'base64'
          )}`
        : null;
    return (
      <>
        {review ? (
          <>
            <Header />
            <div className='post-bg'>
              <div className='post-heading'>
                <div className='post-container'>
                  <div className='title'>
                    <h2>{review.name}</h2>
                    <p>{review.subtext}</p>
                    <div className='post-section-subtext'>
                      <span className='post-subtext'>
                        <span className='post-tag'>Publisher: </span>
                        {review.publisher}
                      </span>
                      <span className='post-subtext'>
                        <span className='post-tag'>Released on: </span>{' '}
                        {review.releaseAt}
                      </span>
                      <span className='post-subtext'>
                        <span className='post-tag'>Author: </span>{' '}
                        {review.author.username}
                      </span>
                    </div>
                    <div className='post-genre-row'>
                      {genreArray.map((item, index) => (
                        <Pill key={index}>{item}</Pill>
                      ))}
                    </div>
                  </div>
                  <div className='post-image'>
                    <img src={imgBuffer} alt={review.name} />
                  </div>
                </div>
              </div>
            </div>

            <div className='post-container'>
              <Markdown children={review.body} className='review' />
            </div>
          </>
        ) : null}
      </>
    );
  }
}
export default Review;
