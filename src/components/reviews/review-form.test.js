import React from 'react';
import renderer from 'react-test-renderer';
import Form from './review-form.jsx';


it(`<Form /> should render`, () => {
  const tree = renderer.create(<Form />).toJSON();

  expect(tree).toMatchSnapshot();
});