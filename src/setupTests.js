import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
};

window.alert = jest.fn();

fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
        ok: true,
        text: () => "Teste"
    }));
