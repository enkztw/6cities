import * as React from 'react';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import Tab from './tab';

const mockStore = configureStore([]);

describe(`Render <Tab />`, () => {
  it(`<Tab /> should render`, () => {
    const city = `Amsterdam`;
    const store = mockStore({
      cities: {
        current: `Paris`
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Tab name={city}/>
        </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Active <Tab /> should render`, () => {
    const city = `Paris`;
    const store = mockStore({
      cities: {
        current: `Paris`
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Tab name={city}/>
        </Provider>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
