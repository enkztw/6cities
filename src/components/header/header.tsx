import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {AppRoute} from '../../common/const';
import {getAuthorizationStatus, getUsername} from '../../store/reducer/user/selectors';


const Header: React.FC<{isAuthorized: boolean; name: string}> = ({isAuthorized, name}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.ROOT}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link to={isAuthorized ? AppRoute.FAVORITES : AppRoute.LOGIN} className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">{isAuthorized ? name : `Sign in`}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthorizationStatus(state),
  name: getUsername(state)
});

export default connect(mapStateToProps)(Header);
