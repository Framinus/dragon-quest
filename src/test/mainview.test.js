import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import enzyme, { shallow, mount, render } from 'enzyme';
import { createStore, applyMiddleware, compose } from 'redux';
import renderer from 'react-test-renderer';
import toJSON from 'enzyme-to-json';
import MainView from '../components/mainView';
import reducers from '../reducers';

enzyme.configure({ adapter: new Adapter() });

const createStoreWithMiddleware = createStore(
  reducers,
  compose(
    applyMiddleware(promise))
  );

describe('MainView component', () => {

  const wrapper = shallow(<MainView />);

  it('should be selectable by "main-view-container"', () => {
    expect(wrapper.is('.main-view-container')).toBe(true);
  });

  it('should match its empty snapshot', () => {
    const tree = renderer.create(
      <Provider store={createStoreWithMiddleware} >
        <MainView />
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

})
