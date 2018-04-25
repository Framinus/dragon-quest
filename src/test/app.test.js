import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import enzyme, { shallow, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import renderer from 'react-test-renderer';
import toJSON from 'enzyme-to-json';
import ConnectedApp from '../App';
import reducers from '../reducers';
import { App } from '../App';

enzyme.configure({ adapter: new Adapter() });

const createStoreWithMiddleware = createStore(
  reducers,
  compose(
    applyMiddleware(promise))
  );

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={createStoreWithMiddleware} >
        <ConnectedApp />
      </Provider>, div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  const wrapper = shallow(< App />);

  it('should be selectable by class "App"', () => {
    expect(wrapper.is('.App')).toBe(true);
  });

  it('should render a MainView component', () => {
    expect(wrapper.find('.MainView')).toHaveLength(1);
  });

  it('should match its empty snapshot', () => {
    const tree = renderer.create(
      <Provider store={createStoreWithMiddleware} >
        <ConnectedApp />
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
})
