import React from 'react';
import Landing from './Landing';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Landing />);
});
