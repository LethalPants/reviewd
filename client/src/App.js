import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCurrentUser,
  selectCurrentUserType
} from './redux/user/user.selectors';
import HomePage from './pages/Homepage/Homepage.page';
import SignIn from './pages/sign-in/SignIn.page';
import SignUp from './pages/sign-up/SignUp.page';
import PostReview from './pages/PostReview/PostReview.pages';
function App({ user, type }) {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route
        path='/signup'
        render={() => (user ? <Redirect to='/' /> : <SignUp />)}
      />
      <Route
        exact
        path='/signin'
        render={() => (user ? <Redirect to='/' /> : <SignIn />)}
      />
      <Route
        exact
        path='/review/new'
        render={() =>
          type === 'editor' ? <PostReview /> : <Redirect to='/' />
        }
      />
      <Route component={HomePage} />
    </Switch>
  );
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  type: selectCurrentUserType
});

export default connect(mapStateToProps)(App);
