import React from 'react';

import Main from './main/main.jsx';

export default function App(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <Main names={props.names} cities={props.cities} city={props.city} />
  );
}

