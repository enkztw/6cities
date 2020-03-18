import * as React from 'react';

import {Review} from '../../common/interfaces';
import {Months} from '../../common/const';


const ReviewsList: React.FC<{reviews: Review[]}> = ({reviews}) => {
  return (
    <React.Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map(({user: {id, name, avatarUrl}, rating, comment, date}) => {
          const dateInstance = new Date(date);
          return (
            <li key={`${id}-${name}-${date}`} className="reviews__item">
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt={name}/>
                </div>
                <span className="reviews__user-name">
                  {name}
                </span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{width: `${20 * rating}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">
                  {comment}
                </p>
                <time className="reviews__time" dateTime={date}>{Months[dateInstance.getMonth()]} {dateInstance.getFullYear()}</time>
              </div>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default React.memo(ReviewsList);
