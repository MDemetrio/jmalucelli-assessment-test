import React from 'react';
import App from '../App';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Landing from '../pages/Landing';
import Quote from '../pages/Quote';
import { getQuoteByCnpj } from '../services/quoteService';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});

describe('App routing', () => {
  it('should render Landing component on "/" route', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(wrapper.containsMatchingElement(Landing)).toBe(true);
  })

  it('should render Quote component on "/quote" route', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/quote']}>
        <App />
      </MemoryRouter>
    )
    expect(wrapper.containsMatchingElement(Quote)).toBe(true);
  })

  it('should render Landing component on undeclared route', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/undeclaredroute']}>
        <App />
      </MemoryRouter>
    )
    expect(wrapper.containsMatchingElement(Landing)).toBe(true);
  })

});

describe('Services', () => {
  it('should call fetch once with cnpj on getQuoteByCnpj', () => {
    getQuoteByCnpj('123456');
    expect(fetch).toHaveBeenCalled();
  })

});