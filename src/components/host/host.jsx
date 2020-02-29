import React from "react";
import PropTypes from 'prop-types';

function Host({isPro, name, avatarUrl}) {
  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className={`property__avatar-wrapper user__avatar-wrapper${isPro ? ` property__avatar-wrapper--pro` : ``}`}>
          <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar"/>
        </div>
        <span className="property__user-name">
          {name}
        </span>
      </div>
      <div className="property__description">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quas laboriosam quidem placeat accusantium rem fuga, ipsam consequuntur perspiciatis repellendus saepe expedita culpa adipisci labore amet. Unde nostrum excepturi neque.</p>
      </div>
    </div>
  );
}

Host.propTypes = {
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  isPro: PropTypes.bool
};

export default Host;
