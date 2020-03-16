import * as React from 'react';
import {connect} from 'react-redux';

import {OperationStatus, COMMENT} from '../../const';
import {getOfferID} from '../../store/reducers/offers/selectors';
import {getStatus} from '../../store/reducers/request/selectors';
import {ActionCreator, setComment} from '../../store/actions/actions';
import withValues from '../../hocs/with-values/with-values';


interface Props {
  id: number;
  status: OperationStatus;
  comment: string;
  rating: number;
  onSubmit: (data: object) => void;
  onReset: () => void;
  onStatusReset: () => void;
  onRatingChange: (e: React.SyntheticEvent) => void;
  onCommentChange: (e: React.SyntheticEvent) => void;
}

class ReviewForm extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    const {status, onReset, onStatusReset} = this.props;

    if (status === OperationStatus.SUCCESS) {
      onReset();
      onStatusReset();
    }
  }


  handleSubmit(e) {
    e.preventDefault();

    const {comment, rating, id, onSubmit} = this.props;
    onSubmit({
      comment,
      rating,
      id
    });
  }

  render() {
    const {status, rating, comment, onRatingChange, onCommentChange} = this.props;
    const pendingStatus = status === OperationStatus.PENDING;
    const errorStatus = status === OperationStatus.FAILED;

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

const mapStateToProps = (state, props) => ({
  id: getOfferID(state),
  status: getStatus(state, `comment`, props.id)
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(data) {
    dispatch(setComment(data));
  },
  onStatusReset() {
    dispatch(ActionCreator.setRequest({type: `comment`, status: ``}));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(withValues(ReviewForm));
