import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Landing from '../Landing';
import Quote from '../../Quote';
import App from '../../../App';

it('renders without crashing', () => {
  const wrapper = shallow(<Landing history={{}} />);
  expect(wrapper).toMatchSnapshot();
});

describe('Interactions', () => {
  it('should change route to "/quote" and render Quote component on button click', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    wrapper.find('button').simulate('click')

    expect(wrapper.find('Route').prop('location')['pathname']).toBe('/quote')

    expect(wrapper.containsMatchingElement(Quote)).toBe(true);
  });
});