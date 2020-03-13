import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReviewCard from '../ReviewCard/ReviewCard.component';
import {
  selectHighRatedGame,
  selectReviewsFromOne
} from '../../redux/reviews/review.selectors';
import { loadReviews } from '../../redux/reviews/review.actions';

class ReviewDirectory extends React.Component {
  componentDidMount() {
    this.props.loadReviews();
  }
  render() {
    const { reviews } = this.props;
    return (
      <div>
        {reviews
          ? reviews.map((review, index) => (
              <ReviewCard review={review} index={index} key={index} />
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  highRatedGame: selectHighRatedGame,
  reviews: selectReviewsFromOne
});
const mapDispatchToProps = dispatch => ({
  loadReviews: () => dispatch(loadReviews())
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDirectory);
