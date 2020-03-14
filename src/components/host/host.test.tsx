import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {User} from '../../types';
import Host from './host';


const host: User = {
  id: 3,
  isPro: true,
  name: `Angelina`,
  avatarUrl: `img/avatar-angelina.jpg`,
  description: `Hello!`
};

it(`<Host /> should render`, () => {
  const tree = renderer.create(<Host {...host} />).toJSON();

  expect(tree).toMatchSnapshot();
});
