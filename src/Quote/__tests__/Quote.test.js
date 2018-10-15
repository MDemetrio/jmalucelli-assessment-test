import React from 'react';
import Quote from '../Quote';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Quote />);
  expect(wrapper).toMatchSnapshot();
});
