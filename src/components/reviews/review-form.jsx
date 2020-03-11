import React from 'react';
import PropTypes from 'prop-types';

import {OperationStatus, COMMENT} from '../../const.js';
import withValues from '../../hocs/with-values/with-values.jsx';


class ReviewForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    const {commentStatus, onReset, onOperationStatusReset} = this.props;

    if (commentStatus === OperationStatus.SUCCESS) {
      onReset();
      onOperationStatusReset(`commentStatus`);
    }
  }


  handleSubmit(e) {
    const {comment, rating, id, onSubmit} = this.props;

    e.preventDefault();
    onSubmit({
      comment,
      rating,
      id
    });
  }

  render() {
    const {commentStatus, rating, comment, onRatingChange, onCommentChange} = this.props;
    const pendingStatus = commentStatus === OperationStatus.PENDING;
    const errorStatus = commentStatus === OperationStatus.FAILED;

    return (
      <form className={`reviews__form${errorStatus ? ` reviews__form--error` : ``} form`} action="#" method="post" onSubmit={this.handleSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {[5, 4, 3, 2, 1].map((i) => {
            return (
              <React.Fragment key={`star-${i}`}>
                <input className="form__rating-input visually-hidden" name="rating" value={i} id={`${i}-stars`} type="radio" onChange={onRatingChange} checked={i === rating} disabled={pendingStatus}/>
                <label htmlFor={`${i}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </React.Fragment>
            );
          })}
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={onCommentChange} value={comment} disabled={pendingStatus}></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{COMMENT.minLength} characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={!rating || comment.length < COMMENT.minLength || pendingStatus}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  id: PropTypes.number,
  commentStatus: PropTypes.string,
  rating: PropTypes.number,
  comment: PropTypes.string,
  onOperationStatusReset: PropTypes.func,
  onRatingChange: PropTypes.func,
  onCommentChange: PropTypes.func,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func
};

export default withValues(ReviewForm);
