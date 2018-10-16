import React from 'react';
import Quote from '../Quote';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(<Quote />);
  expect(wrapper).toMatchSnapshot();
});

describe('Quote component state', () => {
  it('should not fetch when form is invalid', () => {
    const wrapper = mount(<Quote />)
    wrapper.setState({ formValid: false })
    wrapper.find('form').simulate('submit');

    expect(fetch).toHaveBeenCalledTimes(0);
  })

  it('should fetch once when form is valid', () => {
    const cnpj = '12.432.423/0001-23'
    const wrapper = mount(<Quote />)
    wrapper.setState({ cnpj, formValid: true })
    wrapper.find('form').simulate('submit');

    expect(fetch).toHaveBeenCalledTimes(1);
  })

  it('should disable button when fetching', () => {
    const wrapper = mount(<Quote />)
    wrapper.setState({ isFetching: true })

    expect(wrapper.find('button').prop('disabled')).toBe(true)
  })

  it('should disable button when fetching', () => {
    const wrapper = mount(<Quote />)
    wrapper.setState({ isFetching: true })

    expect(wrapper.find('button').prop('disabled')).toBe(true)
  })

  it('should set state on input change', () => {
    const wrapper = mount(<Quote />)
    wrapper.find('input').simulate('change', { target: { name: "cnpj", value: "test" } });

    expect(wrapper.state('cnpj')).toBe('test');
  })


});