import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCurrentUser,
  selectCurrentUserType
} from './redux/user/user.selectors';
import HomePage from './pages/Homepage/Homepage.page';
import Login from './pages/Login/Login.page';
import Register from './pages/Register/Register.page';
import PostReview from './pages/PostReview/PostReview.pages';
import ReviewPage from './pages/Review/Review.page';
function App({ user, type }) {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route
        path='/register'
        render={() => (user ? <Redirect to='/' /> : <Register />)}
      />
      <Route
        exact
        path='/login'
        render={() => (user ? <Redirect to='/' /> : <Login />)}
      />
      <Route
        exact
        path='/review/new'
        render={() =>
          type === 'editor' ? <PostReview /> : <Redirect to='/' />
        }
      />
      <Route path='/review/:id' component={ReviewPage} />
      <Route component={HomePage} />
    </Switch>
  );
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  type: selectCurrentUserType
});

export default connect(mapStateToProps)(App);
