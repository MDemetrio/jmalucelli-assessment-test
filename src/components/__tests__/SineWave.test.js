import React from 'react';
import { shallow, mount } from 'enzyme';
import SineWave from '../SineWave';

it('renders without crashing', () => {
    const wrapper = shallow(<SineWave />);
    expect(wrapper).toMatchSnapshot();
});

it('calculate a random range correctly', () => {
    const wrapper = mount(<SineWave />);
    console.log(wrapper.debug())

    expect(wrapper).toBeDefined();
});