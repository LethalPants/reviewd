import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
// import reviewReducer from './review/review.reducer';

const rootReducer = combineReducers({
  user: userReducer
  //   review: reviewReducer
});

export default rootReducer;
