import * as React from 'react';

import {User} from '../../interfaces';


const Host: React.FC<User> = ({name, isPro, description, avatarUrl}: User) => {
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
        <p>{description}</p>
      </div>
    </div>
  );
};

export default React.memo(Host);
