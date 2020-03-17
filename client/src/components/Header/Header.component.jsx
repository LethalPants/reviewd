import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { logout } from '../../redux/user/user.actions';

import './Header.styles.css';
const Header = ({ user, logout, history }) => {
  const [visibility, setvisibility] = useState(false);
  const togglevisibility = () => setvisibility(!visibility);
  return (
    <header className='header-fixed'>
      <div className='header-limiter'>
        <h1 onClick={() => history.push('/')}>Reviewd</h1>

        <nav>
          {user ? (
            <div className='links'>
              {user.type === 'editor' ? (
                <Link to='/review/new'>Post Review</Link>
              ) : null}
              <div
                className='user-menu-wrap'
                onClick={() => togglevisibility()}
              >
                <span className='mini-photo-wrapper'>
                  <img
                    className='mini-photo'
                    src='data:image/png;base64,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'
                    width='36'
                    height='36'
                    alt={user.username}
                  />
                </span>
                <div className={`menu-container ${visibility ? 'active' : ''}`}>
                  <ul className='user-menu'>
                    <li className='user-menu-item'>
                      <Link className='user-menu-link' to='/'>
                        My Profile
                      </Link>
                    </li>
                    <li className='user-menu-item'>
                      <span className='user-menu-link' onClick={logout}>
                        Logout
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
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
