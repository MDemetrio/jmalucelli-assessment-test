import React from 'react';
import Quote from './Quote';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Quote />);
});
