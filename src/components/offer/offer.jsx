import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {setBookmark} from '../../store/actions/actions.js';
import {AppRoute} from '../../const.js';

function Offer({id, title, type, previewImage, isPremium, isFavorite, price, rating, handleMouseEnter, handleMouseLeave, onClick, mini = false}) {
  const handleClick = () => onClick(id, isFavorite ? 0 : 1);
  return (
    <article className={`${mini ? `favorites__card` : `cities__place-card`} place-card`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} data-id={id}>
      {isPremium && <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${mini ? `favorites__image-wrapper` : `cities__image-wrapper`} place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width={mini ? `150` : `260`}
            height={mini ? `110` : `200`}
            alt="Place image"
          />
        </a>
      </div>
      <div className={`${mini ? `favorites__card-info ` : ``}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">
                    &#47;&nbsp;night
            </span>
          </div>
          <button
            onClick={handleClick}
            className={`place-card__bookmark-button button${isFavorite ? ` place-card__bookmark-button--active` : ``}`}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width="18"
              height="19"
            >
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(rating) * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OFFER}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

Offer.propTypes = {
  mini: PropTypes.bool,
  bedrooms: PropTypes.number,
  city: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number
    }),
    name: PropTypes.string
  }),
  description: PropTypes.string,
  goods: PropTypes.arrayOf(PropTypes.string),
  host: PropTypes.shape({
    avatarUrl: PropTypes.string,
    id: PropTypes.number,
    isPro: PropTypes.bool,
    name: PropTypes.string
  }),
  id: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.string),
  isFavorite: PropTypes.bool,
  isPremium: PropTypes.bool,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number
  }),
  maxAdults: PropTypes.number,
  previewImage: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  title: PropTypes.string,
  type: PropTypes.string,
  handleMouseEnter: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  onClick: PropTypes.func
};


const mapDispatchToProps = (dispatch) => ({
  onClick(id, status) {
    dispatch(setBookmark(id, status));
  }
});

export default connect(null, mapDispatchToProps)(Offer);
