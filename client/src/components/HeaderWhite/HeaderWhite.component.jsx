import React from 'react';
import { createStructuredSelector } from 'reselect';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { logout } from '../../redux/user/user.actions';

import './HeaderWhite.styles.css';
const Header = ({ user, logout, history }) => {
  return (
    <header className='white-header-fixed'>
      <div className='white-header-limiter'>
        <h1 onClick={() => history.push('/')}>Reviewd</h1>

        <nav>
          {user ? (
            <div className='white-links'>
              {user.type === 'editor' ? (
                <Link to='/review/new'>Post Review</Link>
              ) : null}
              <span onClick={logout}>Logout</span>
            </div>
          ) : (
            <div>
              <Link to='/register'>Sign up</Link>
              <Link to='/login'>Sign in</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
