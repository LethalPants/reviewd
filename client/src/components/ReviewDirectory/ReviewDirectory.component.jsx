import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CardGrid from '../CardGrid/CardGrid.component';
import HeroReview from '../HeroReview/HeroReview.component';
import {
  selectHighRatedGame,
  selectTenReview
} from '../../redux/reviews/review.selectors';
import { loadReviews } from '../../redux/reviews/review.actions';
import './ReviewDirectory.styles.css';

class ReviewDirectory extends React.Component {
  componentDidMount() {
    this.props.loadReviews();
  }
  render() {
    const { highRatedGame, reviews } = this.props;
    return (
      <div className='main-grid'>
        <HeroReview review={highRatedGame} />
        <CardGrid reviews={reviews} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  highRatedGame: selectHighRatedGame,
  reviews: selectTenReview
});
const mapDispatchToProps = dispatch => ({
  loadReviews: () => dispatch(loadReviews())
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDirectory);
